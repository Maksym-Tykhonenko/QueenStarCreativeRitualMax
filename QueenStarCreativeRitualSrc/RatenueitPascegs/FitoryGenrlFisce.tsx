import { rvasebfntsatory } from '../rvasebfntsatory';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View as Layviewrva,
    Dimensions as Obimens,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default function FitoryGenrlFisce({ setActiveIceNode }: { setActiveIceNode: (node: any) => void }) {
    const { width: sertor_With, height: sertor_Hei } = Obimens.get('window');
    const [currentDay, setCurrentDay] = useState(1);
    const [completedDays, setCompletedDays] = useState<number[]>([]);
    const [todayProgress, setTodayProgress] = useState({ completed: 0, total: 2 });
    const [timerEnd, setTimerEnd] = useState<number | null>(null);
    const [timerActive, setTimerActive] = useState(false);
    const [timerLeft, setTimerLeft] = useState(0);

    // Додаємо шляхи до зображень
    const appIcon = require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png'); // замініть шлях на ваш
    const starIcon = require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/yelstar.png'); // замініть шлях на ваш

    // Функція для форматування часу у mm:ss
    const formatTime = (seconds: number) => {
        const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
        const ss = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${mm}:${ss}`;
    };

    // Перевірка таймера при монтуванні
    useEffect(() => {
        const checkTimer = async () => {
            const storedEnd = await AsyncStorage.getItem('fitory_timer_end');
            if (storedEnd) {
                const end = parseInt(storedEnd, 10);
                const now = Date.now();
                if (end > now) {
                    setTimerEnd(end);
                    setTimerActive(true);
                    setTimerLeft(Math.ceil((end - now) / 1000));
                } else {
                    await AsyncStorage.removeItem('fitory_timer_end');
                    setTimerEnd(null);
                    setTimerActive(false);
                    setTimerLeft(0);
                }
            }
        };
        checkTimer();
    }, []);

    // Оновлення таймера кожну секунду
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timerActive && timerEnd) {
            interval = setInterval(() => {
                const now = Date.now();
                const left = Math.ceil((timerEnd - now) / 1000);
                if (left > 0) {
                    setTimerLeft(left);
                } else {
                    setTimerActive(false);
                    setTimerEnd(null);
                    setTimerLeft(0);
                    AsyncStorage.removeItem('fitory_timer_end');
                }
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerActive, timerEnd]);

    return (
        <Layviewrva style={{
            alignItems: 'center',
            flex: 1,
            paddingTop: sertor_Hei * 0.02,
            backgroundColor: 'transparent',
        }}>
            {/* App Icon */}
            <Layviewrva style={{
                alignItems: 'center',
                marginBottom: sertor_Hei * 0.025,
                width: sertor_With * 0.32,
                height: sertor_With * 0.32,
                // overflow: 'visible',
            }}>
                <Image
                    source={appIcon}
                    style={{
                        width: sertor_With * 0.32,
                        height: sertor_With * 0.32,
                        marginBottom: sertor_Hei * 0.01,
                        // Додаємо світіння
                        zIndex: 10,
                        // overflow: 'visible',
                    }}
                    resizeMode="contain"
                />
            </Layviewrva>

            {/* Day Indicators */}
            <Layviewrva style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: sertor_With * 0.9,
                marginTop: sertor_Hei * 0.02,
            }}>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                    const isCompleted = completedDays.includes(day);
                    const isCurrent = day === currentDay;
                    const isFailed = day < currentDay && !isCompleted;

                    return (
                        <Layviewrva
                            key={day}
                            style={{
                                width: sertor_With * 0.11,
                                height: sertor_With * 0.11,
                                borderRadius: sertor_With * 0.025,
                                backgroundColor: isCompleted
                                    ? '#4CAF50'
                                    : isFailed
                                        ? '#F44336'
                                        : '#1a1a1a',
                                borderWidth: isCurrent ? 2 : 1,
                                borderColor: isCurrent ? '#FFD700' : '#333',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {isCompleted ? (
                                <Text style={{
                                    fontSize: sertor_With * 0.06,
                                    color: '#fff',
                                }}>✓</Text>
                            ) : isFailed ? (
                                <Text style={{
                                    fontSize: sertor_With * 0.06,
                                    color: '#fff',
                                }}>✕</Text>
                            ) : (
                                <Text style={{
                                    fontSize: sertor_With * 0.045,
                                    color: '#fff',
                                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                                }}>{day}</Text>
                            )}
                        </Layviewrva>
                    );
                })}
            </Layviewrva>

            {/* Theme Card */}
            <Layviewrva style={{
                width: sertor_With * 0.92,
                marginTop: sertor_Hei * 0.04,
                borderRadius: sertor_With * 0.06,
                borderWidth: 1.5,
                borderColor: '#FFD700',
                backgroundColor: '#111',
                padding: sertor_With * 0.045,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#FFD700',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.18,
                shadowRadius: sertor_With * 0.06,
                elevation: 8,
            }}>
                {/* Star with glow */}
                <Layviewrva style={{
                    width: sertor_With * 0.26,
                    height: sertor_With * 0.26,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: sertor_With * 0.04,
                    shadowColor: '#FFD700',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.7,
                    shadowRadius: sertor_With * 0.1,
                    elevation: 18,
                }}>
                    <Image
                        source={starIcon}
                        style={{
                            width: sertor_With * 0.19,
                            height: sertor_With * 0.19,
                            zIndex: 2,

                        }}
                        resizeMode="contain"
                    />
                </Layviewrva>
                {/* Texts and button */}
                <Layviewrva style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: sertor_With * 0.055,
                        color: '#fff',
                        fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                        marginBottom: sertor_Hei * 0.012,
                    }}>
                        Theme for drawing
                    </Text>
                    <Text style={{
                        fontSize: sertor_With * 0.038,
                        color: '#fff',
                        fontFamily: rvasebfntsatory.ritualOutfiReg,
                        textAlign: 'left',
                        marginBottom: sertor_Hei * 0.022,
                        lineHeight: sertor_With * 0.052,
                    }}>
                        Draw 2 pictures and submit{'\n'}them for evaluation.
                    </Text>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-start',
                            borderRadius: sertor_With * 0.03,
                            overflow: 'hidden',
                            shadowColor: '#FFD700',
                            shadowOffset: { width: 0, height: sertor_Hei * 0.008 },
                            shadowOpacity: 0.35,
                            shadowRadius: sertor_With * 0.018,
                            elevation: 7,
                            width: sertor_With * 0.28,
                            height: sertor_Hei * 0.05,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={async () => {
                            if (!timerActive) {
                                const end = Date.now() + 30 * 60 * 1000; // 30 хвилин
                                await AsyncStorage.setItem('fitory_timer_end', end.toString());
                                setTimerEnd(end);
                                setTimerActive(true);
                                setTimerLeft(30 * 60);
                            }
                        }}
                        disabled={timerActive}
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
                            fontSize: sertor_With * 0.042,
                            color: '#111',
                            fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                            textAlign: 'center',
                        }}>
                            {timerActive ? formatTime(timerLeft) : 'Start'}
                        </Text>
                    </TouchableOpacity>
                </Layviewrva>
            </Layviewrva>

            {/* Progress Bar */}
            <Layviewrva style={{
                width: sertor_With * 0.87,
                marginTop: sertor_Hei * 0.025,
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: sertor_With * 0.04,
                    color: '#fff',
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold,
                    marginBottom: sertor_Hei * 0.01,
                }}>
                    {todayProgress.completed} of {todayProgress.total}
                </Text>

                <Layviewrva style={{
                    width: '100%',
                    height: sertor_Hei * 0.015,
                    backgroundColor: '#333',
                    borderRadius: sertor_With * 0.01,
                    overflow: 'hidden',
                }}>
                    <Layviewrva style={{
                        width: `${(todayProgress.completed / todayProgress.total) * 100}%`,
                        height: '100%',
                        backgroundColor: '#FFD700',
                    }} />
                </Layviewrva>
            </Layviewrva>

            {/* Categories Button */}
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    alignSelf: 'center',
                    width: sertor_With * 0.7,
                    height: sertor_Hei * 0.073,
                    borderRadius: sertor_With * 0.035,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: sertor_Hei * 0.04,
                }}
                onPress={() => setActiveIceNode('Star Categories Show')}
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
                    fontSize: sertor_With * 0.05,
                    color: '#000000',
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold
                }}>
                    Categories
                </Text>
            </TouchableOpacity>

            {/* History Button */}
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    alignSelf: 'center',
                    width: sertor_With * 0.59,
                    height: sertor_Hei * 0.065,
                    borderRadius: sertor_With * 0.035,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: '#FFD700',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: sertor_Hei * 0.025,
                }}
                onPress={() => setActiveIceNode('Ritl History Of Stars')}
            >
                <Text style={{
                    fontSize: sertor_With * 0.05,
                    color: 'white',
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold
                }}>
                    History
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    bottom: sertor_Hei * 0.03,
                    position: 'absolute',
                    alignSelf: 'center',
                }}
                onPress={() => setActiveIceNode('Collec Ritls Str Qn')}
            >
                <Image
                    source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/collectionbtn.png')}
                    style={{
                        width: sertor_With * 0.16,
                        height: sertor_With * 0.16,
                        resizeMode: 'contain',
                    }}
                />
            </TouchableOpacity>
        </Layviewrva >
    );
}