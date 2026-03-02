import React, { useState as usePolarLatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FitoryGenrlFisce from './FitoryGenrlFisce';
import {
    SafeAreaView as CryoSafePane,
    Dimensions as FrostWindowGauge,
    View as FiceViewsh,
} from 'react-native';
import CreativeCategories from './CreativeCategories';
import StarHistorytual from './StarHistorytual';
import RuarilWallpapers from './RuarilWallpapers';

type ObserFishNode =
    | 'Arcerell-home-gener'
    | 'Collec Ritls Str Qn'
    | 'Private Ice Articles For Tickets'
    | 'Ritl History Of Stars'
    | 'Fish Observatory Needs Some Personalization';

const frostMetrics = FrostWindowGauge.get('window');
const ICE_VIEW_H = frostMetrics.height;
const ICE_VIEW_W = frostMetrics.width;

const OsertishWrapIcingCatch: React.FC = () => {
    const [activeIceNode, setActiveIceNode] =
        usePolarLatch<ObserFishNode>('Arcerell-home-gener');

    const renderIceSector = (node: ObserFishNode) => {
        switch (node) {
            case 'Arcerell-home-gener':
                return <FitoryGenrlFisce setActiveIceNode={setActiveIceNode} />;
            case 'Star Categories Show':
                return <CreativeCategories setActiveIceNode={setActiveIceNode} />;
            case 'Ritl History Of Stars':
                return <StarHistorytual setActiveIceNode={setActiveIceNode} />;
            case 'Collec Ritls Str Qn':
                return <RuarilWallpapers setActiveIceNode={setActiveIceNode} />;
            default:
                return null;
        }
    };

    return (
        <FiceViewsh style={{
            height: ICE_VIEW_H,
            width: ICE_VIEW_W,
            flex: 1,
            backgroundColor: '#000000',
        }}
        >
            <CryoSafePane />

            {renderIceSector(activeIceNode)}
        </FiceViewsh>
    );
};

export default OsertishWrapIcingCatch;