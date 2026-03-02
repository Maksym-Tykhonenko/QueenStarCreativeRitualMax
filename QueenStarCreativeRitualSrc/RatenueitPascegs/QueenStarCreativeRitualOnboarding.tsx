import React, { useState as useRitualStep } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FROSTFISH_SIGMA = 'tocks-tiks-onb-fish-serv-0324-432-45322-543';
import {
    useWindowDimensions as RitualDimens,
    Text as RitarteenTexive,
    View as QueenViewtual,
    TouchableOpacity as StarToucher,
    Image as RitualSlideImage,
} from 'react-native';
import { rvasebfntsatory } from '../rvasebfntsatory';
import { useNavigation as useStarRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const QueenStarCreativeRitualOnboarding: React.FC = () => {
    const [ritualStep, setRitualStep] = useRitualStep(0);
    const starRoute = useStarRoute();

    const ritualSlides = [
        require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/ritualsopnd/IAmCleoYourstarguide.png'),
        require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/ritualsopnd/ChooseStarCreatemoment.png'),
        require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/ritualsopnd/DaysOnePathYourReward.png'),
    ];

    const { width: ritualW, height: ritualH } = RitualDimens();

    const handleNextRitual = async () => {
        if (ritualStep < ritualSlides.length - 1) {
            setRitualStep(prev => prev + 1);
        } else {
            try {
                await AsyncStorage.setItem(FROSTFISH_SIGMA, 'complete');
            } catch (ritualErr) {
                if (__DEV__) console.warn('IceFish::onboard-freeze', ritualErr);
            }
            starRoute.replace?.('OsertishWrapIcingCatch');
        }
    };

    const activeRitualSlide = ritualSlides[ritualStep];

    return (
        <QueenViewtual
            style={{
                width: ritualW,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
                height: ritualH,
            }}
        >
            {/* dynamic observatory slide */}
            <RitualSlideImage
                resizeMode="cover"
                source={activeRitualSlide}
                style={{
                    alignSelf: 'center',
                    height: ritualH * 1.02,
                    width: ritualW,
                    position: 'absolute',
                    top: 0,
                }}
            />

            {/* forward current */}
            <StarToucher
                activeOpacity={0.9}
                style={{
                    bottom: ritualH * 0.05,
                    position: 'absolute',
                    alignSelf: 'center',
                    width: ritualW * 0.7,
                    height: ritualH * 0.073,
                    borderRadius: ritualW * 0.035,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={handleNextRitual}
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
                <RitarteenTexive style={{
                    fontSize: ritualW * 0.05,
                    color: '#000000',
                    fontFamily: rvasebfntsatory.ritualOutfiSemiBold
                }}>
                    {ritualStep === 0 ? 'Next' : ritualStep === 1 ? 'Okay' : 'Start'}
                </RitarteenTexive>
            </StarToucher>
        </QueenViewtual>
    );
};

export default QueenStarCreativeRitualOnboarding;