import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomToggleSwitch from '@/components/CustomToggleSwitch';
import ImageSlider from '@/components/ImageSlider';
import { getCats, voteForCat } from '../services/api';
import { fixedCats } from '@/assets/fixedCats';

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: {}[]
}

const listSize = 10;

const Home: React.FC = () => {

  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const data = await getCats(listSize);
      setCats((prevCats) => [...prevCats, ...data]);
    } catch (error) {
      console.error('Erro ao buscar gatos. Usando fixedCats.', error);
      setCats((prevCats) => [...prevCats, ...fixedCats]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    if (cats.length - currentIndex < 4) {
      fetchCats();
    }
  }, [currentIndex]);



  const handleAccept = (cat: Cat) => {
    console.log("🚀 ~ handleAccept ~ cat:")
    handleVote(cat.id, true)
  }

  const handleDecline = (cat: Cat) => {
    console.log("🚀 ~ handleDecline ~ cat:")
    handleVote(cat.id, false)
  }

  const handleVote = async (imageId: string, isUpVote: boolean) => {
    try {
      const value = isUpVote ? 1 : -1;
      const response = await voteForCat(imageId, value);
      // console.log('Vote register', response);
    } catch (error) {
      console.error('Error on vote:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 50 }}>
        <CustomToggleSwitch />
      </View>

      <ImageSlider catList={cats} onAccept={handleAccept} onDecline={handleDecline} activeIndex={setCurrentIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FBFAFF"
  }
})

export default Home;