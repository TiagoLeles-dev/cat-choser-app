import React, { useCallback, useRef, useState } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    type ImageSourcePropType,
    TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import { fixedCats } from '@/assets/fixedCats';

interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: {}[]
}

interface ImageSliderProps {
    catList: Cat[];
    onAccept: (cat: Cat) => void;
    onDecline: (cat: Cat) => void;
    activeIndex: (index) => void;
}

const ICON_SIZE = 30;

const ImageSlider: React.FC<ImageSliderProps> = ({ catList, onAccept, onDecline, activeIndex }) => {

    const ref = useRef<SwiperCardRefType>(null);
    const renderCard = useCallback((cat: Cat) => {
        const breed = cat.breeds?.[0] ?? { name: 'Unknown', origin: 'Unknown' };

        // API to get vote not working, doing this to simulate the value
        const catIdNumbers = cat.id.match(/\d+/)?.join('') || '0';

        return (
            <View style={styles.renderCardContainer}>
                <Image
                    source={{ uri: cat.url }}
                    style={styles.renderCardImage}
                    resizeMode="cover"
                />
                <View style={styles.cardInfoContainer}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.catId}>{breed.name}</Text>
                        <Text style={styles.catHeight}>{catIdNumbers}</Text>
                    </View>
                    <Text style={styles.catWidth}>{breed.origin}</Text>
                </View>
            </View>
        );
    }, []);



    const OverlayLabelRight = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: 'rgba(32, 188, 32, 0.6)',
                    },
                ]}
            />
        );
    }, []);

    const OverlayLabelLeft = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: 'rgba(192, 45, 45, 0.6)',
                    },
                ]}
            />
        );
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.subContainer}>
                <Swiper
                    ref={ref}
                    cardStyle={styles.cardStyle}
                    data={catList || fixedCats}
                    renderCard={renderCard}
                    onIndexChange={(index) => {
                        activeIndex(index);
                        console.log('Current Active index', index);
                    }}
                    onSwipeRight={(cardIndex) => {
                        const activeCat = catList[cardIndex];
                        console.log('cardIndex', cardIndex);
                        onAccept(activeCat);
                    }}
                    onSwipeLeft={(cardIndex) => {
                        const activeCat = catList[cardIndex];
                        console.log('onSwipeLeft', cardIndex);
                        onDecline(activeCat);
                    }}
                    disableTopSwipe
                    disableBottomSwipe
                    OverlayLabelRight={OverlayLabelRight}
                    OverlayLabelLeft={OverlayLabelLeft}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        ref.current?.swipeLeft();
                    }}
                >
                    <AntDesign name="close" size={ICON_SIZE} color="red" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        ref.current?.swipeRight();
                    }}
                >
                    <AntDesign name="heart" size={ICON_SIZE} color="green" />
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        bottom: 130,
        alignItems: 'center',
        gap: 60,
    },
    button: {
        height: 54,
        borderRadius: 40,
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        // iOS
        shadowColor: '#BFBFC0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 16,

        // Android
        elevation: 16,
    },
    cardStyle: {
        width: '90%',
        height: '70%',
        borderRadius: 15,
        // iOS
        shadowColor: '#BFBFC0',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 16,

        // Android
        elevation: 16,
    },
    renderCardContainer: {
        flex: 1,
        borderRadius: 15,
        height: '75%',
        width: '100%',
    },
    renderCardImage: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    cardInfoContainer: {
        backgroundColor: 'white',
        marginHorizontal: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: -50,
        height: 50,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    catId: {
        paddingLeft: 14,
        fontSize: 16,
        fontWeight: '600',
    },
    catHeight: {
        paddingRight: 14,
        fontSize: 14,
        fontWeight: '600',
    },
    catWidth: {
        paddingLeft: 14,
        fontSize: 11,
        fontWeight: '300',
        paddingBottom: 6,
    },
});

export default ImageSlider;
