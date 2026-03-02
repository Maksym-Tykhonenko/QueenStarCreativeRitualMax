import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import creartualDrowing from '../Ritlsdata/creartualDrowing';
import { launchImageLibrary } from 'react-native-image-picker';
import { rvasebfntsatory } from '../rvasebfntsatory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const CATEGORIES = [
    {
        type: 'yellow',
        title: 'Theme for drawing',
        description: 'Get a theme, focus and convey the idea through the drawing.\nYour creativity is in the spotlight.',
        icon: require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/yelstar.png'),
    },
    {
        type: 'purple',
        title: 'Thought for the text',
        description: 'Write down what resonates inside.\nWords preserve your state and mood of the moment.',
        icon: require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/purplestar.png'),
    },
    {
        type: 'red',
        title: 'Emotion for photos',
        description: 'Repeat the emotion as accurately as possible.\nThe face, the look and the feeling – everything matters.',
        icon: require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/redstar.png'),
    },
];

const EMOTION_PHOTOS = [
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/emtns/emotion_1.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/emtns/happy.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/emtns/thinking.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/emtns/serious.png'),
    require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/emtns/sad.png'),
];

function getRandomTasks(arr: any[], n: number) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

function getRandomEmotionPhoto() {
    return EMOTION_PHOTOS[Math.floor(Math.random() * EMOTION_PHOTOS.length)];
}

export default function CreativeCategories({ setActiveIceNode }: { setActiveIceNode: (node: any) => void }) {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [step, setStep] = useState(0);
    const [tasks, setTasks] = useState<any[]>([]);
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [timer, setTimer] = useState(600);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [photo, setPhoto] = useState<any>(null);
    const [textInput, setTextInput] = useState('');
    const [emotionPhoto, setEmotionPhoto] = useState<any>(null);

    const currentCategory = CATEGORIES[categoryIndex];

    const generateUniqueId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        return `${timestamp}-${random}`;
    };

    const saveTaskToStorage = async (taskData: any) => {
        try {
            const existingTasks = await AsyncStorage.getItem('completedTasks');
            const tasks = existingTasks ? JSON.parse(existingTasks) : [];

            const newTask = {
                id: generateUniqueId(),
                date: new Date().toISOString(),
                category: currentCategory.type,
                categoryTitle: currentCategory.title,
                taskTitle: selectedTask?.title || 'Emotion Task',
                taskDescription: selectedTask?.description || '',
                photo: taskData.photo,
                text: taskData.text || null,
                timestamp: Date.now(),
            };

            tasks.push(newTask);
            await AsyncStorage.setItem('completedTasks', JSON.stringify(tasks));

            return true;
        } catch (error) {
            console.error('Error saving task:', error);
            return false;
        }
    };

    const resetToInitial = () => {
        setStep(0);
        setSelectedTask(null);
        setSelectedImage(null);
        setPhoto(null);
        setTextInput('');
        setTimer(600);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    // Cleanup timer on unmount or step change
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [step]);

    // Step 3: Timer with selected image (Yellow only)
    useEffect(() => {
        if (step === 3) {
            timerRef.current = setInterval(() => {
                setTimer(t => {
                    if (t <= 1) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setStep(6);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [step]);

    // Step 4: Timer for purple category
    useEffect(() => {
        if (step === 4) {
            timerRef.current = setInterval(() => {
                setTimer(t => {
                    if (t <= 1) {
                        if (timerRef.current) clearInterval(timerRef.current);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [step]);

    const min = Math.floor(timer / 60).toString().padStart(2, '0');
    const sec = (timer % 60).toString().padStart(2, '0');

    // Step 0: Category selection
    if (step === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => setActiveIceNode('Arcerell-home-gener')}>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Categories</Text>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                        style={styles.logoSmall}
                    />
                </View>

                <View style={styles.progressContainer}>
                    <View style={[styles.progressDot, styles.progressActive]} />
                    <View style={styles.progressDot} />
                    <View style={styles.progressDot} />
                </View>

                <View style={styles.centerContent}>
                    <Image
                        source={currentCategory.icon}
                        style={styles.starLarge}
                    />
                    <View style={styles.cardBox}>
                        <Text style={styles.themeTitle}>{currentCategory.title}</Text>
                        <Text style={styles.themeDesc}>
                            {currentCategory.description}
                        </Text>
                    </View>
                </View>

                <View style={{
                    width: width * 0.93,
                    alignSelf: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: height * 0.03,
                    position: 'absolute',
                    bottom: height * 0.04,
                }}>
                    <TouchableOpacity
                        style={{
                            width: height * 0.07,
                            height: height * 0.07,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: width * 0.04,
                            borderWidth: width * 0.004,
                            borderColor: '#e5c60d',
                        }}
                        onPress={() => setCategoryIndex((categoryIndex - 1 + CATEGORIES.length) % CATEGORIES.length)}
                    >
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: width * 0.5,
                            height: height * 0.07,
                            borderRadius: width * 0.035,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            overflow: 'hidden',
                        }}
                        onPress={() => {
                            if (currentCategory.type === 'red') {
                                setEmotionPhoto(getRandomEmotionPhoto());
                                setStep(5);
                            } else {
                                setTasks(getRandomTasks(creartualDrowing, 3));
                                setStep(1);
                            }
                        }}
                    >
                        <LinearGradient
                            colors={['#967300', '#CEA100', '#FFF11C', '#FFFFC9', '#FFFF6D', '#FFFF6A', '#DFB90E', '#DAAE00']}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                            }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0.01, 0.15, 0.39, 0.55, 0.71, 0.81, 0.91, 0.95]}
                        />
                        <Text style={styles.chooseBtnText}>Choose</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            width: height * 0.07,
                            height: height * 0.07,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: width * 0.04,
                            borderWidth: width * 0.004,
                            borderColor: '#e5c60d',
                        }}
                        onPress={() => setCategoryIndex((categoryIndex + 1) % CATEGORIES.length)}
                    >
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/right_arrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Step 1: Choose a topic (Yellow & Purple)
    if (step === 1) {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => setStep(0)}>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Categories</Text>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                        style={styles.logoSmall}
                    />
                </View>

                <View style={styles.themeHeaderBox}>
                    <Image
                        source={currentCategory.icon}
                        style={styles.starMedium}
                    />
                    <Text style={styles.themeHeaderText}>{currentCategory.title}</Text>
                </View>

                <View style={styles.topicContainer}>
                    <View style={{
                        borderWidth: width * 0.004,
                        borderColor: '#FFD700',
                        borderRadius: width * 0.04,
                        marginHorizontal: width * 0.04,
                        paddingVertical: height * 0.02,
                        width: width * 0.93,
                        alignSelf: 'center',
                        paddingHorizontal: width * 0.04,
                    }}>
                        <Text style={styles.topicTitle}>Choose a topic</Text>
                        {tasks.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.topicCard}
                                onPress={() => {
                                    setSelectedTask(item);
                                    setTimer(600); // Reset timer
                                    if (currentCategory.type === 'purple') {
                                        setStep(4); // Text input step
                                    } else {
                                        setStep(2); // Image selection
                                    }
                                }}
                            >
                                <View>
                                    <Text style={styles.topicCardTitle}>{item.title}</Text>
                                    <Text style={styles.topicCardDesc}>{item.description}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: height * 0.01,
                                    right: width * 0.04,
                                    gap: width * 0.01,
                                }}>
                                    <Image
                                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/timeTopic.png')}
                                        style={{
                                            width: width * 0.05,
                                            height: width * 0.05,
                                        }}
                                        resizeMode='contain'
                                    />
                                    <Text style={styles.topicTime}>10:00</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: height * 0.03,
                        right: width * 0.08,
                        width: width * 0.17,
                        height: width * 0.17,
                        borderRadius: width * 0.04,
                        justifyContent: 'center',
                        borderWidth: width * 0.004,
                        borderColor: '#e5c60d',
                        alignItems: 'center',
                    }}
                    onPress={() => setTasks(getRandomTasks(creartualDrowing, 3))}
                >
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/shuffle_icon.png')}
                        style={styles.shuffleIconImg}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    // Step 2: Choose inspiration image (Yellow only)
    if (step === 2) {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Categories</Text>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                        style={styles.logoSmall}
                    />
                </View>

                <View style={[styles.timerBoxTop, {
                    flexDirection: 'row',
                    gap: width * 0.019,
                    alignItems: 'center',
                }]}>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/timeTopic.png')}
                        style={{
                            width: width * 0.07,
                            height: width * 0.07,
                            tintColor: 'white',
                        }}
                        resizeMode='contain'
                    />
                    <Text style={[styles.topicTime, {
                        color: 'white',
                        fontSize: width * 0.05,
                        fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                    }]}>10:00</Text>
                </View>

                <Text style={[styles.inspireTitle, {
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                }]}>Works that can inspire</Text>

                {selectedImage ? (
                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            width: width * 0.7,
                            height: width * 0.7,
                            borderWidth: 2,
                            borderColor: '#FFD700',
                            borderRadius: width * 0.07,
                            overflow: 'hidden',
                            marginBottom: height * 0.03,
                            marginTop: height * 0.03,
                        }}
                        activeOpacity={0.9}
                        onPress={() => setSelectedImage(null)}
                    >
                        <Image
                            source={selectedImage}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.imageGrid}>
                        {selectedTask?.photos?.map((img: any, idx: number) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.gridItem}
                                onPress={() => setSelectedImage(img)}
                            >
                                <Image source={img} style={styles.gridImage} />
                                <View style={styles.openIconContainer}>
                                    <Image
                                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/open.png')}
                                        style={styles.openIconImg}
                                        resizeMode='contain'
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.chooseBtn, {
                        height: height * 0.07,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: width * 0.035,
                        marginTop: height * 0.025,
                    }]}
                    onPress={() => {
                        if (!selectedImage) {
                            Alert.alert('Please select an image', 'You need to select an inspiration image first');
                            return;
                        }
                        setTimer(600);
                        setStep(3);
                    }}
                >
                    <LinearGradient
                        colors={['#967300', '#CEA100', '#FFF11C', '#FFFFC9', '#FFFF6D', '#FFFF6A', '#DFB90E', '#DAAE00']}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.01, 0.15, 0.39, 0.55, 0.71, 0.81, 0.91, 0.95]}
                    />
                    <Text style={styles.chooseBtnText}>Start Timer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Step 3: Timer with selected image (Yellow only)
    if (step === 3) {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setStep(2);
                    }}>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Categories</Text>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                        style={styles.logoSmall}
                    />
                </View>

                <View style={[styles.timerBoxTop, {
                    flexDirection: 'row',
                    gap: width * 0.019,
                    alignItems: 'center',
                }]}>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/timeTopic.png')}
                        style={{
                            width: width * 0.07,
                            height: width * 0.07,
                            tintColor: 'white',
                        }}
                        resizeMode='contain'
                    />
                    <Text style={[styles.topicTime, {
                        color: 'white',
                        fontSize: width * 0.05,
                        fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                    }]}>{min}:{sec}</Text>
                </View>

                <Text style={[styles.inspireTitle, {
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                }]}>Works that can inspire</Text>

                {selectedImage && (
                    <View style={styles.singleImageContainer}>
                        <Image source={selectedImage} style={styles.singleImage} />
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedImage(null)}>
                            <Text style={styles.closeBtnText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.chooseBtn, {
                        height: height * 0.07,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: width * 0.035,
                        marginTop: height * 0.025,
                    }]}
                    onPress={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setStep(6);
                    }}
                >
                    <LinearGradient
                        colors={['#967300', '#CEA100', '#FFF11C', '#FFFFC9', '#FFFF6D', '#FFFF6A', '#DFB90E', '#DAAE00']}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.01, 0.15, 0.39, 0.55, 0.71, 0.81, 0.91, 0.95]}
                    />
                    <Text style={styles.chooseBtnText}>Done</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Step 4: Text input (Purple only)
    if (step === 4) {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}>
                <View style={styles.container}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => {
                            if (timerRef.current) clearInterval(timerRef.current);
                            setStep(1);
                        }}>
                            <Image
                                source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.header}>Categories</Text>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                            style={styles.logoSmall}
                        />
                    </View>

                    <View style={[styles.timerBoxTop, {
                        flexDirection: 'row',
                        gap: width * 0.019,
                        alignItems: 'center',
                    }]}>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/timeTopic.png')}
                            style={{
                                width: width * 0.07,
                                height: width * 0.07,
                                tintColor: 'white',
                            }}
                            resizeMode='contain'
                        />
                        <Text style={[styles.topicTime, {
                            color: 'white',
                            fontSize: width * 0.05,
                            fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                        }]}>{min}:{sec}</Text>
                    </View>

                    {selectedTask && (
                        <View style={[styles.selectedTaskBox, {
                            marginTop: height * 0.03,
                        }]}>
                            <Text style={[styles.selectedTaskTitle, {
                                fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                            }]}>{selectedTask.title}</Text>
                            <Text style={[styles.selectedTaskDesc, {
                                fontFamily: rvasebfntsatory.ritualOutfiReg,
                            }]}>{selectedTask.description}</Text>
                        </View>
                    )}

                    <View style={styles.textInputContainer}>
                        <Text style={[styles.textInputLabel, {
                            fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                        }]}>A place to write</Text>
                        <TextInput
                            style={[styles.textInputArea, {
                                fontFamily: rvasebfntsatory.ritualOutfiReg,
                            }]}
                            placeholder="Description..."
                            placeholderTextColor="#666"
                            multiline
                            value={textInput}
                            onChangeText={setTextInput}
                        />
                    </View>

                    {textInput.length > 0 && (
                        <TouchableOpacity
                            style={[styles.chooseBtn, {
                                height: height * 0.07,
                                overflow: 'hidden',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: width * 0.035,
                                marginTop: height * 0.025,
                            }]}
                            onPress={async () => {
                                if (timerRef.current) clearInterval(timerRef.current);
                                const saved = await saveTaskToStorage({
                                    text: textInput,
                                    photo: null,
                                });
                                if (saved) {
                                    Alert.alert('Success', 'Your text has been saved!', [
                                        {
                                            text: 'OK',
                                            onPress: () => resetToInitial()
                                        }
                                    ]);
                                } else {
                                    Alert.alert('Error', 'Failed to save your text');
                                }
                            }}
                        >
                            <LinearGradient
                                colors={['#967300', '#CEA100', '#FFF11C', '#FFFFC9', '#FFFF6D', '#FFFF6A', '#DFB90E', '#DAAE00']}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0.01, 0.15, 0.39, 0.55, 0.71, 0.81, 0.91, 0.95]}
                            />
                            <Text style={styles.chooseBtnText}>Submit</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    // Step 5: Red star - Emotion photo
    if (step === 5) {
        const pickImage = () => {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
                if (response.assets && response.assets.length > 0) {
                    setPhoto(response.assets[0].uri);
                }
            });
        };

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => setStep(0)}>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Categories</Text>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                        style={styles.logoSmall}
                    />
                </View>

                <View style={[styles.emotionPhotoContainer, {
                    marginTop: height * 0.04,
                }]}>
                    <Image source={emotionPhoto} style={styles.emotionPhoto} />
                </View>

                <View style={[styles.arrowsDown, {
                    flexDirection: 'column'
                }]}>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/arrow_down.png')}
                        style={styles.arrowDownIcon}
                    />
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/arrow_down.png')}
                        style={styles.arrowDownIcon}
                    />
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/arrow_down.png')}
                        style={styles.arrowDownIcon}
                    />
                </View>

                <TouchableOpacity style={styles.photoPickerBox} onPress={pickImage}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={styles.pickedPhoto} />
                    ) : (
                        <View style={styles.photoPickerPlaceholder}>
                            <Image
                                source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/add_photo_icon.png')}
                                style={styles.addPhotoIcon}
                            />
                            <Text style={[styles.addPhotoText, {
                                fontFamily: rvasebfntsatory.ritualOutfiReg,
                            }]}>Add a photo</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {photo && (
                    <TouchableOpacity
                        style={[styles.chooseBtn, {
                            height: height * 0.07,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: width * 0.035,
                            marginTop: height * 0.025,
                        }]}
                        onPress={async () => {
                            const saved = await saveTaskToStorage({
                                photo: photo,
                                text: null,
                            });
                            if (saved) {
                                Alert.alert('Success', 'Your photo has been submitted!', [
                                    {
                                        text: 'OK',
                                        onPress: () => resetToInitial()
                                    }
                                ]);
                            } else {
                                Alert.alert('Error', 'Failed to save your photo');
                            }
                        }}
                    >
                        <LinearGradient
                            colors={['#967300', '#CEA100', '#FFF11C', '#FFFFC9', '#FFFF6D', '#FFFF6A', '#DFB90E', '#DAAE00']}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                            }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0.01, 0.15, 0.39, 0.55, 0.71, 0.81, 0.91, 0.95]}
                        />
                        <Text style={styles.chooseBtnText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    // Step 6: Upload photo (Yellow category after timer)
    if (step === 6) {
        const pickImage = () => {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
                if (response.assets && response.assets.length > 0) {
                    setPhoto(response.assets[0].uri);
                }
            });
        };

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => setStep(3)}>
                        <Image
                            source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/backarrow.png')}
                            style={styles.arrowIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.header}>Categories</Text>
                    <Image
                        source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                        style={styles.logoSmall}
                    />
                </View>

                <Text style={[styles.uploadTitle, {
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                }]}>Add a photo of your drawing.</Text>

                <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={styles.uploadImg} />
                    ) : (
                        <View style={styles.uploadPlaceholder}>
                            <Image
                                source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/yelstar.png')}
                                style={styles.placeholderIcon}
                            />
                        </View>
                    )}
                </TouchableOpacity>

                <Text style={[styles.uploadHint, {
                    fontFamily: rvasebfntsatory.ritualOutfiReg,
                }]}>
                    You need to provide a photo of the drawing for evaluation,{'\n'}
                    otherwise the task will not be included in your score.
                </Text>

                {photo && (
                    <TouchableOpacity
                        style={[styles.chooseBtn, {
                            height: height * 0.07,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: width * 0.035,
                            marginTop: height * 0.025,
                        }]}
                        onPress={async () => {
                            const saved = await saveTaskToStorage({
                                photo: photo,
                                text: null,
                            });
                            if (saved) {
                                Alert.alert('Success', 'Your drawing has been submitted!', [
                                    {
                                        text: 'OK',
                                        onPress: () => resetToInitial()
                                    }
                                ]);
                            } else {
                                Alert.alert('Error', 'Failed to save your drawing');
                            }
                        }}
                    >
                        <LinearGradient
                            colors={['#967300', '#CEA100', '#FFF11C', '#FFFFC9', '#FFFF6D', '#FFFF6A', '#DFB90E', '#DAAE00']}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                            }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0.01, 0.15, 0.39, 0.55, 0.71, 0.81, 0.91, 0.95]}
                        />
                        <Text style={styles.chooseBtnText}>Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.021,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 20,
        marginHorizontal: width * 0.04,
        marginTop: height * 0.02,
    },
    backBtn: {
        width: width * 0.12,
        height: width * 0.12,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIcon: {
        width: width * 0.05,
        height: width * 0.05,
        resizeMode: 'contain',
    },
    header: {
        color: '#fff',
        fontSize: width * 0.055,
        fontWeight: 'bold',
    },
    logoSmall: {
        width: width * 0.12,
        height: width * 0.12,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.03,
        gap: width * 0.02,
    },
    progressDot: {
        width: width * 0.25,
        height: height * 0.008,
        backgroundColor: '#333',
        borderRadius: 4,
    },
    progressActive: {
        backgroundColor: '#FFD700',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    starLarge: {
        width: width * 0.4,
        height: width * 0.4,
        marginBottom: height * 0.03,
    },
    starMedium: {
        width: width * 0.15,
        height: width * 0.15,
    },
    cardBox: {
        backgroundColor: '#0a0a0a',
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 20,
        padding: width * 0.06,
        width: width * 0.9,
        alignItems: 'center',
    },
    themeTitle: {
        color: '#fff',
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: height * 0.015,
        textAlign: 'center',
    },
    themeDesc: {
        color: '#aaa',
        fontSize: width * 0.035,
        textAlign: 'center',
        lineHeight: width * 0.055,
    },
    chooseBtn: {
        width: width * 0.7,
        alignSelf: 'center',
        marginBottom: height * 0.03,
    },
    gradientBtn: {
        borderRadius: 16,
        paddingVertical: height * 0.018,
        alignItems: 'center',
    },
    chooseBtnText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: width * 0.045,
    },
    nextArrow: {
        position: 'absolute',
        bottom: height * 0.03,
        right: width * 0.08,
        width: width * 0.12,
        height: width * 0.12,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextArrowText: {
        color: '#FFD700',
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    themeHeaderBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 20,
        marginHorizontal: width * 0.04,
        marginTop: height * 0.02,
        padding: width * 0.04,
        gap: width * 0.03,
    },
    themeHeaderText: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    topicContainer: {
        flex: 1,
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.04,
    },
    topicTitle: {
        color: '#fff',
        fontSize: width * 0.05,
        marginBottom: height * 0.02,
        textAlign: 'center',
        fontFamily: rvasebfntsatory.ritualOutfiSemiBold
    },
    topicList: {
        flex: 1,
    },
    topicCard: {
        backgroundColor: '#0a0a0a',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 16,
        padding: width * 0.04,
        marginBottom: height * 0.015,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topicCardTitle: {
        color: '#fff',
        fontSize: width * 0.048,
        fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
        marginBottom: height * 0.005,
    },
    topicCardDesc: {
        color: '#FFFFFF',
        fontSize: width * 0.04,
        width: width * 0.6,
        fontFamily: rvasebfntsatory.ritualOutfiReg,
    },
    topicTime: {
        color: '#634D01',
        fontSize: width * 0.035,
        fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
    },
    shuffleBtn: {
        position: 'absolute',
        bottom: height * 0.03,
        right: width * 0.08,
        width: width * 0.14,
        height: width * 0.14,
        backgroundColor: '#FFD700',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shuffleIconImg: {
        width: width * 0.088,
        height: width * 0.088,
        resizeMode: 'contain',
    },
    timerBoxTop: {
        alignSelf: 'center',
        backgroundColor: '#0a0a0a',
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 16,
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.08,
        marginTop: height * 0.03,
    },
    timerTextSmall: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    inspireTitle: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: height * 0.03,
        marginBottom: height * 0.02,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: width * 0.04,
        gap: width * 0.03,
    },
    gridItem: {
        width: width * 0.39,
        height: width * 0.39,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    gridImage: {
        width: width * 0.39,
        height: width * 0.39,
        resizeMode: 'cover',
    },
    openIconContainer: {
        position: 'absolute',
        bottom: width * 0.02,
        right: width * 0.02,
        width: width * 0.1,
        height: width * 0.1,
        backgroundColor: '#FFD700',
        borderRadius: width * 0.021,
        justifyContent: 'center',
        alignItems: 'center',
    },
    openIconImg: {
        width: width * 0.05,
        height: width * 0.05,
        resizeMode: 'contain',
    },
    singleImageContainer: {
        alignSelf: 'center',
        width: width * 0.85,
        height: width * 1.1,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 24,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: height * 0.03,
    },
    singleImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    closeBtn: {
        position: 'absolute',
        bottom: width * 0.04,
        left: '50%',
        marginLeft: -width * 0.08,
        width: width * 0.16,
        height: width * 0.16,
        backgroundColor: '#FFD700',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        color: '#000',
        fontSize: width * 0.07,
        fontWeight: 'bold',
    },
    selectedTaskBox: {
        backgroundColor: '#0a0a0a',
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 16,
        padding: width * 0.04,
        marginHorizontal: width * 0.04,
        marginTop: height * 0.02,
    },
    selectedTaskTitle: {
        color: '#fff',
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginBottom: height * 0.005,
    },
    selectedTaskDesc: {
        color: '#aaa',
        fontSize: width * 0.032,
    },
    textInputContainer: {
        // flex: 1,
        marginHorizontal: width * 0.04,
        marginTop: height * 0.03,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 20,
        padding: width * 0.04,
        backgroundColor: '#0a0a0a',
        height: height * 0.4,
    },
    textInputLabel: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginBottom: height * 0.015,
    },
    textInputArea: {
        flex: 1,
        color: '#fff',
        fontSize: width * 0.04,
        textAlignVertical: 'top',
        height: height * 0.4,
    },
    emotionPhotoContainer: {
        alignSelf: 'center',
        width: width * 0.35,
        height: width * 0.35,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 24,
        overflow: 'hidden',
        marginTop: height * 0.05,
    },
    emotionPhoto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    arrowsDown: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: width * 0.02,
        marginVertical: height * 0.03,
    },
    arrowDownIcon: {
        width: width * 0.08,
        height: width * 0.08,
        resizeMode: 'contain',
    },
    photoPickerBox: {
        alignSelf: 'center',
        width: width * 0.35,
        height: width * 0.35,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
        marginBottom: height * 0.03,
    },
    photoPickerPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhotoIcon: {
        width: width * 0.1,
        height: width * 0.1,
        resizeMode: 'contain',
        marginBottom: height * 0.01,
    },
    addPhotoText: {
        color: '#fff',
        fontSize: width * 0.04,
    },
    pickedPhoto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    uploadTitle: {
        color: '#fff',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: height * 0.05,
        marginBottom: height * 0.03,
    },
    uploadBox: {
        width: width * 0.85,
        height: width * 0.95,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
    },
    uploadImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    uploadPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderIcon: {
        width: width * 0.25,
        height: width * 0.25,
        opacity: 0.3,
    },
    uploadHint: {
        color: '#aaa',
        fontSize: width * 0.03,
        textAlign: 'center',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.08,
        lineHeight: width * 0.045,
    },
});