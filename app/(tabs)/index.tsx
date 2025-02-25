import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomToggleSwitch from '@/components/CustomToggleSwitch';
import ImageSlider from '@/components/ImageSlider';
import { fixedCats } from '@/assets/fixedCats';

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

const Home: React.FC = () => {

  const handleAccept = (cat: Cat) => {
    console.log("🚀 ~ handleAccept ~ cat:", cat)

  }

  const handleDecline = (cat: Cat) => {
    console.log("🚀 ~ handleAccept ~ cat:", cat)

  }

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 50 }}>
        <CustomToggleSwitch />
      </View>

      <ImageSlider catList={fixedCats} onAccept={handleAccept} onDecline={handleDecline} />
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