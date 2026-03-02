import React, { useState, useRef } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    Share,
    Alert,
    Platform,
} from 'react-native';
import { rvasebfntsatory } from '../rvasebfntsatory';
import ViewShot from 'react-native-view-shot';

const { width, height } = Dimensions.get('window');

const WALLPAPERS = [
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/wallpapers/first.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/wallpapers/sec.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/wallpapers/third.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/wallpapers/4.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/wallpapers/fifth.png'),
];

export default function RuarilWallpapers({ setActiveIceNode }: { setActiveIceNode: (node: any) => void }) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<number | null>(null);
    const viewShotRefs = useRef<any[]>([]);

    const saveToGallery = async (imageIndex: number) => {
        try {
            // For now, just show success alert
            // In production, you'd need to implement actual save functionality
            Alert.alert('Success', 'Wallpaper saved to gallery!');
        } catch (error) {
            console.error('Error saving image:', error);
            Alert.alert('Error', 'Failed to save wallpaper');
        }
    };

    const shareWallpaper = async (imageIndex: number) => {
        try {
            const ref = viewShotRefs.current[imageIndex];
            if (!ref) {
                Alert.alert('Error', 'Failed to capture image');
                return;
            }
            const uri = await ref.capture();
            if (!uri) {
                Alert.alert('Error', 'Failed to capture image');
                return;
            }
            if (Platform.OS === 'ios') {
                await Share.share({
                    url: uri,
                    title: 'Wallpaper',
                });
            } else {
                await Share.share({
                    message: 'Check out this wallpaper!',
                    url: `file://${uri}`,
                    title: 'Wallpaper',
                });
            }
        } catch (error: any) {
            console.error('Error sharing:', error);
            Alert.alert('Error', error?.message || 'Failed to share wallpaper');
        }
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#000',
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: width * 0.05,
                paddingVertical: height * 0.021,
                borderWidth: width * 0.005,
                borderColor: '#FFD700',
                borderRadius: width * 0.05,
                marginHorizontal: width * 0.04,
                marginTop: height * 0.02,
            }}>
                <TouchableOpacity
                    style={{
                        width: width * 0.12,
                        height: width * 0.12,
                        borderWidth: width * 0.005,
                        borderColor: '#FFD700',
                        borderRadius: width * 0.03,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => setActiveIceNode('Arcerell-home-gener')}
                >
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                        style={{
                            width: width * 0.05,
                            height: width * 0.05,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    color: '#fff',
                    fontSize: width * 0.055,
                    fontWeight: 'bold',
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                }}>Collection</Text>
                <Image
                    source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                    style={{
                        width: width * 0.12,
                        height: width * 0.12,
                    }}
                />
            </View>

            <ScrollView
                style={{
                    flex: 1,
                    marginTop: height * 0.03,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: width * 0.04,
                    paddingBottom: height * 0.03,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}>
                    {WALLPAPERS.map((wallpaper, index) => (
                        <View
                            key={index}
                            style={{
                                width: width * 0.44,
                                marginBottom: height * 0.025,
                            }}
                        >
                            <View style={{
                                width: '100%',
                                height: width * 0.59,
                                borderWidth: width * 0.005,
                                borderColor: '#FFD700',
                                borderRadius: width * 0.05,
                                overflow: 'hidden',
                                marginBottom: height * 0.012,
                            }}>
                                <ViewShot
                                    ref={ref => { viewShotRefs.current[index] = ref; }}
                                    options={{
                                        format: 'png',
                                        quality: 1,
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <Image
                                        source={wallpaper}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            resizeMode: 'cover',
                                        }}
                                    />
                                </ViewShot>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    gap: width * 0.016,
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    bottom: height * 0.015,
                                    width: '80%',
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            height: height * 0.055,
                                        }}
                                        onPress={() => shareWallpaper(index)}
                                    >
                                        <Image
                                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/save_button.png')}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            height: height * 0.055,
                                        }}
                                        onPress={() => shareWallpaper(index)}
                                    >
                                        <Image
                                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/share_button.png')}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
