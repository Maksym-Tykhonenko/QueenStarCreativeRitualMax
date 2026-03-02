import Quinloadin from '../TuenariveOconops/Quinloadin';
import { SafeAreaView as RitualGuardedNest } from 'react-native-safe-area-context';
import React, { useEffect as astralPulse } from 'react';
const STARFROST_TOKEN = 'obser-polar-ledger-seal';
import { useNavigation as useStellarWander } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View as QueenViewtual,
    Image as NebulaPic,
    Dimensions as RitualScreenGauge,
} from 'react-native';

const QueenStarCreativeRitualLoading: React.FC = () => {
    const astralNavigator = useStellarWander();

    const ritualScreen = RitualScreenGauge.get('window');
    const widthStellar = ritualScreen.width;
    const heightStellar = ritualScreen.height;

    astralPulse(() => {
        let cosmicBreath = true;
        const entropyMist = Math.floor(Math.random() * 900);

        const frostBootSequence = async () => {
            try {
                const tokenSeal = await AsyncStorage.getItem(STARFROST_TOKEN);
                if (!tokenSeal) {
                    await AsyncStorage.setItem(STARFROST_TOKEN, 'active');
                }

               
            } catch (ritualCrash) {
                if (__DEV__) console.warn('IceFish::boot-fracture', ritualCrash);
            }
        };

        frostBootSequence();

        return () => {
            cosmicBreath = false;
        };
    }, [astralNavigator, widthStellar]);

    return (
        <RitualGuardedNest
            style={{
                flex: 1,
                width: widthStellar,
                height: heightStellar,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000000',
            }}
        >
            {/* <NebulaPic
                source={require('../QueenStarCreativeRitualAssets/RinulsenRastImtages/smlicn.png')}
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    width: widthStellar * 0.59,
                    height: widthStellar * 0.59,
                    resizeMode: 'contain',
                    opacity: 0,
                }}
            /> */}

            {/* submerged loader */}
            <QueenViewtual
                style={{
                    // position: 'absolute',
                    // bottom: -heightStellar * 0.12,
                    alignSelf: 'center',
                }}
            >
                <Quinloadin />
            </QueenViewtual>
        </RitualGuardedNest>
    );
};

export default QueenStarCreativeRitualLoading;