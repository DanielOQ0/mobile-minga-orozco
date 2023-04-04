import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import axios from "axios";
import CardMangas from "../components/CardMangas";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import mangaClick from "../store/Details/actions";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";

const { mangaClicked } = mangaClick;
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Mangas() {
  const [mangas, setMangas] = useState([]);
  const [originalMangas, setOriginalMangas] = useState([]);
  const [categorias, setCate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch()
  
  useFocusEffect(React.useCallback(() => {
    dispatch(mangaClicked({ state: false }));
  }, []));

  useEffect(() => {
    setLoading(true);
    let page =`/mangas/view?page=${currentPage}`
    let url = process.env.API_URL.concat(page);
    axios.get(url)
      .then((response) => {
        if (response.data.mangas.length === 0) {
          setHasMore(false);
        } else {
          if (currentPage === 1) {
            setOriginalMangas(response.data.mangas);
          } else {
            setOriginalMangas((prevMangas) => [
              ...prevMangas,
              ...response.data.mangas,
            ]);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        if(error.response.data.message==="Mangas not found"){
          setHasMore(false);
          setLoading(false);
        }
      });
  }, [currentPage, searchQuery]);

  useEffect(() => {
    let url = process.env.API_URL.concat("/mangas");
    axios.get(url)
      .then((response) => {
        setCate(response.data.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentPage(1);
    setOriginalMangas([]);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const filteredMangas = originalMangas.filter((manga) => {
    return manga.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
      <ScrollView style={styles.containTotal}>
        <ImageBackground source={require("../../assets/backgroundMangas.jpg")}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.fondoMangaImg}>
              <ImageBackground style={styles.container}>
                <Text style={{fontSize:50,color:"#fff"}}>Mangas</Text>
              </ImageBackground>
            </View>

            <View style={styles.sectionManga}>
              <View style={styles.var}>
                <View style={styles.item} />
              </View>
              <View style={styles.searchContainer}>
                <FontAwesome5 name="search" size={20} style={styles.searchIcon}/>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Find your manga here"
                  onChangeText={handleSearch}
                />
              </View>
              <ScrollView contentContainerStyle={styles.contCartas}>
                {filteredMangas.length > 0 &&
                  filteredMangas.map((manga, index) => (
                    <CardMangas
                      key={index}
                      _id={manga._id}
                      title={manga.title}
                      category={
                        categorias.find((cat) => cat._id === manga.category_id)
                          ?.name
                      }
                      photo={{ uri: manga.cover_photo }}
                    />
                  ))}
              </ScrollView>

              {loading && <Text style={styles.loadMoreButton}>Loading...</Text>}
              {!loading && hasMore && (
                <Text style={styles.loadMoreButton} onPress={handleLoadMore}>
                  Load more
                </Text>
              )}
              {!loading && !hasMore && (
                <Text style={styles.noMoreButton}>No more mangas to show</Text>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </ScrollView>
  );
}

const styles = {
  scrollView: {
    height: "100%"
  },
  loadMoreButton: {
    color: "black",
    fontSize: 15,
    height: 22,
    borderRadius: 15,
    width: 110,
    backgroundColor: "rgba(255, 255, 255, 1)",
    textAlign: "center",
  },
  noMoreButton: {
    color: "white",
    fontSize: 15,
    height: 22,
    borderRadius: 15,
    width: 200,
    backgroundColor: "rgba(128, 128, 128, 0.8)",
    textAlign: "center",
  },
  containTotal: {
    width: screenWidth,
    backgroundColor:"black"
  },
  container: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    position: "relative",
    justifyContent:"center",
    alignItems:"center"
  },
  fondoMangaImg: {
    width: "100%",
    marginTop: 30,
  },

  title: {
    fontSize: 44,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
  },
  searchContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 40,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionManga: {
    flex: 1,
    padding: 20,
    width: "100%",
    backgroundColor: "rgba(20, 20, 20, 0.5)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -50,
    alignItems: "center",
    flexDirection: "column",
  },
  exploreMangas: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  contCartas: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  var: {
    height: 4,
    borderRadius: 3,
    width: "60%",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  item: {
    paddingHorizontal: 1,
  },
 
};
