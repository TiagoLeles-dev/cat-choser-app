import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomToggleSwitch from '@/components/CustomToggleSwitch';
import ImageSlider from '@/components/ImageSlider';
import { getCats } from '../services/api';
import { fixedCats } from '@/assets/fixedCats';

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

const listSize = 10;

const Home: React.FC = () => {

  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    if (loading) return; // Impede chamadas duplicadas

    try {
      setLoading(true);
      const data = await getCats(listSize);
      setCats((prevCats) => [...prevCats, ...data]); // Adiciona novos gatos à lista
    } catch (error) {
      console.error('Erro ao buscar gatos. Usando fixedCats.', error);
      setCats((prevCats) => [...prevCats, ...fixedCats]); // Usa fallback
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

  }

  const handleDecline = (cat: Cat) => {
    console.log("🚀 ~ handleAccept ~ cat:")

  }

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