import { useEffect, useRef, useState } from 'react';
import styled from './FullLoading.less'
import { Progress } from 'antd';
import LOGO from '@/assets/icon/icon.svg'

const FullLoading: React.FC = () => {
    const [percent, setPercent] = useState<number>(0);
    const timer = useRef<any>(null);

    const clearInt = () => {
        clearInterval(timer.current);
        // setPercent()
    }

    useEffect(() => {
        timer.current = setInterval(() => {
            console.log("setInterval");

            setPercent((_percent) => {
                if (_percent >= 100) {
                    clearInt();
                }

                return _percent + 5
            })
        }, 100)

        return () => clearInt();
    }, [])

    return (
        <div id='full-loading'>
            <div className={styled.main} style={styled}>
                <div className='container'>
                    <div className='img-box'>
                        <img src={LOGO} alt="" />
                    </div>
                    <Progress strokeColor="#cf5659" showInfo={false} percent={percent} />
                </div>
            </div>
        </div>
    )
}


export default FullLoading;