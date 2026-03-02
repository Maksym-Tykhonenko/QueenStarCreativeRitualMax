import React, { useState, useEffect } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rvasebfntsatory } from '../rvasebfntsatory';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const CATEGORY_ICONS = {
    yellow: require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/yelstar.png'),
    purple: require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/purplestar.png'),
    red: require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/redstar.png'),
};

export default function StarHistorytual({ setActiveIceNode }: { setActiveIceNode: (node: any) => void }) {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('completedTasks');
            if (storedTasks) {
                const parsedTasks = JSON.parse(storedTasks);
                setTasks(parsedTasks.sort((a: any, b: any) => b.timestamp - a.timestamp));
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            await AsyncStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const filteredTasks = selectedCategory
        ? tasks.filter(task => task.category === selectedCategory)
        : tasks;

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
                }}>History</Text>
                <Image
                    source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                    style={{
                        width: width * 0.12,
                        height: width * 0.12,
                    }}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.03,
                gap: width * 0.04,
                paddingHorizontal: width * 0.04,
            }}>
                {['yellow', 'purple', 'red'].map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={{
                            width: width * 0.27,
                            height: width * 0.27,
                            // backgroundColor: selectedCategory === category ? '#FFD700' : '#0a0a0a',
                            borderWidth: selectedCategory === category ? 0 : width * 0.005,
                            borderColor: '#FFD700',
                            borderRadius: width * 0.05,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                        }}
                        onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                        {selectedCategory === category && (
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
                        )}
                        <Image
                            source={CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}
                            style={{
                                width: width * 0.18,
                                height: width * 0.18,
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color="#FFD700" />
                </View>
            ) : filteredTasks.length === 0 ? (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: '#666',
                        fontSize: width * 0.04,
                        fontFamily: rvasebfntsatory.ritualOutfiReg,
                    }}>No tasks yet</Text>
                </View>
            ) : (
                <ScrollView
                    style={{
                        flex: 1,
                        marginTop: height * 0.02,
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: width * 0.04,
                        paddingBottom: height * 0.03,
                    }}
                >
                    {filteredTasks.map((task) => (
                        <View
                            key={task.id}
                            style={{
                                backgroundColor: '#0a0a0a',
                                borderWidth: width * 0.005,
                                borderColor: '#FFD700',
                                borderRadius: width * 0.05,
                                padding: width * 0.04,
                                marginBottom: height * 0.015,
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: width * 0.03,
                            }}>
                                {task.photo && (
                                    <Image
                                        source={{ uri: task.photo }}
                                        style={{
                                            width: width * 0.25,
                                            height: width * 0.28,
                                            borderRadius: width * 0.04,
                                            borderWidth: width * 0.004,
                                            borderColor: '#FFD700',
                                        }}
                                        resizeMode="cover"
                                    />
                                )}
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: width * 0.046,
                                        fontWeight: 'bold',
                                        fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                                        marginBottom: height * 0.005,
                                    }}>{task.taskTitle}</Text>
                                    <Text style={{
                                        color: '#ffffff',
                                        fontSize: width * 0.037,
                                        fontFamily: rvasebfntsatory.ritualOutfiReg,
                                        marginBottom: height * 0.008,
                                    }} numberOfLines={2}>{task.taskDescription}</Text>
                                    {task.text && (
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: width * 0.032,
                                            fontFamily: rvasebfntsatory.ritualOutfiReg,
                                            marginTop: height * 0.005,
                                        }} numberOfLines={3}>{task.text}</Text>
                                    )}

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        marginTop: height * 0.015,
                                        gap: width * 0.021
                                    }}>
                                        {/* <TouchableOpacity
                                            style={{
                                                backgroundColor: '#FFD700',
                                                borderRadius: width * 0.035,
                                                width: width * 0.25,
                                                height: height * 0.048,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                overflow: 'hidden',
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
                                            <Text style={{
                                                color: '#000',
                                                fontSize: width * 0.038,
                                                fontWeight: 'bold',
                                                fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                                            }}>More</Text>
                                        </TouchableOpacity> */}

                                        <TouchableOpacity
                                            style={{
                                            }}
                                            onPress={() => deleteTask(task.id)}
                                        >
                                            <Image
                                                source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/deleteIcon.png')}
                                                style={{
                                                    width: width * 0.1,
                                                    height: width * 0.1,
                                                    resizeMode: 'contain',
                                                    tintColor: '#FFD700',
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
