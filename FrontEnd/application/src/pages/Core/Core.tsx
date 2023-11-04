import styled from './Core.less';
import Editor from '@/components/Editor/Editor';
import { SettingsContext, useSettings } from '@/components/Editor/context/SettingsContext';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';

const Core: React.FC = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log(1);
        
        setTimeout(() => setLoading(true), 1000)

        return () => console.log(2);
    }, [])

    return (
        <div className={styled.Core}>
            {
                loading ?
                    // {/* <SettingsContext> */ }
                    < div className="editor-shell">
                        <Editor />
                    </div>
                    // {/* </SettingsContext> */ }
                    :
                    <Skeleton active={true} />
            }
        </div >

    );
}

export default Core;