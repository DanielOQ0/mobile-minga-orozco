import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import actions from '../store/Manga/actions.js'
import { useParams } from 'react-router-dom';
import React,{ useState } from "react";
import mangaClick from "../store/Details/actions";
import { useFocusEffect } from "@react-navigation/core";

const { captureManga, captureChapter } = actions;
const { mangaClicked } = mangaClick;

function MangaDetailsScreen({route}) {
    const manga = route.params && route.params._id;
    const page = Number(useParams().page)
    const dispatch = useDispatch()
    const [pagina, setPagina] = useState(1);
    const [chapter, setChapter] = useState({});
    let chapters = useSelector(store => store.manga.chapter);
    const mangas = useSelector(store => store.manga.manga); 
  console.log(pagina);
    useFocusEffect(React.useCallback(() => {
      if (manga) dispatch(captureManga({ manga_id: manga }));
      if (manga) dispatch(captureChapter({ manga_id: manga, page: pagina }));
    }, [manga, pagina, chapters]));
    
    return (
        <ScrollView>
          <ImageBackground source={require('../../assets/backgroundDetails.jpg')}>
            <View style={{ width: '100%', height: 80,alignItems:"center", justifyContent: 'center', backgroundColor: 'rgba(20, 20, 20, 0.8)', marginTop:100, borderTopStartRadius:20,borderTopEndRadius:20 }}>
                <Text style={{ textAlign: 'center', fontSize: 40, color: '#fff', marginTop: 20 }}>{mangas?.title}</Text>
            </View>
            <Image source={{ uri: mangas?.cover_photo }} style={{ width: '100%', height: 400, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 100, borderBottomRightRadius: 100, backgroundColor: 'rgb(63, 61, 62)' }} />
            <View style={{ width: '100%', height: 70, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ textAlign: 'center', borderRadius: 50, width: 150, margin: 30, fontSize: 30, height: 50, backgroundColor: 'rgba(20, 20, 20, 0.8)', color: '#4177B7' }}>{mangas.author_id?.name}</Text>
                <Text style={{ textAlign: 'center', borderRadius: 50, width: 150, margin: 30, fontSize: 30, height: 50, backgroundColor: 'rgba(20, 20, 20, 0.8)', color: '#4177B7' }}>{mangas.category_id?.name}</Text>
            </View>
            <Text style={{ textAlign: 'justify', margin: 20, fontSize: 20, height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'rgb(248, 246, 247)' }}>{mangas?.description}</Text>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'rgb(248, 246, 247)' }}>{chapter?.name}</Text>
            </View>
            <View>
                {chapters?.length > 0 ?
                    chapters?.map(chapter => (
                        <View key={chapter?._id} style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                            <Image style={{ width: 300, height: 300, borderRadius: 40 }} source={{ uri: chapter?.manga_id.cover_photo }} alt={chapter?.title} />
                            <Text style={{ textAlign: 'justify', fontSize: 30, height: 'auto', color: 'rgb(0, 0, 0)', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius:10, marginTop:5,marginBottom:5 }}>{chapter.title}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Chapter', { chapterId: chapter?._id, page: 0 })} >
                                <Text style={{ textAlign: 'center', borderRadius: 50, width: 150, fontSize: 25, height: 40, backgroundColor: 'rgba(20, 20, 20, 0.8)', color: '#4177B7' }}>Read</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                    :
                    null}
                <View style={{ width: '100%', height: 70, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(20, 20, 20, 0.9)' }} >
                    {pagina !== 1 && 
                        <TouchableOpacity onPress={() =>'/manga/' + manga._id  +  setPagina(pagina - 1)}
                            style={{ textAlign: 'center', width: 150, height: 30, color: 'rgb(245, 118, 184)' }}>
                            <Text style={{ textAlign: 'center', width: 150, fontSize: 20, height: 50, color: '#4177B7' }}>Prev</Text>
                        </TouchableOpacity>
                    }
                    {chapters?.length === 4 && (
                        <TouchableOpacity onPress={() =>'/manga/' + manga._id  +  setPagina(pagina + 1)} 
                            style={{ textAlign: 'center', width: 150, height: 30, color: 'rgb(245, 118, 184)' }}>
                            <Text style={{ textAlign: 'center', width: 150, fontSize: 20, height: 50, color: '#4177B7' }}>Next</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
          </ImageBackground>
        </ScrollView>
    )
}
export default MangaDetailsScreen
