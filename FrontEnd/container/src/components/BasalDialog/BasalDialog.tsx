import { Button, Modal, Spin } from "antd";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useState } from "react";
import styles from './BasalDialog.less'
import { classNameJoin } from "@/utils";

interface IBase { [key: string]: any };

interface IBasalDialog extends IBase {
    handleOk: () => any;
    handleCancel: () => any;
    children: React.ReactNode;
    title: string;
    footer?: React.ReactNode;
}

const BasalDialog = (props: IBasalDialog, ref: any) => {
    const { handleOk: onOk = () => { }, handleCancel: onCancel = () => { }, children, title, footer: f, className = "", ...other } = props;

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handler = useCallback(async (fn: () => any) => {
        setLoading(true)
        try {
            await fn();
            setOpen(false);
        } catch (error) {
            console.log("BasalDialog error:", error);
        } finally {
            setLoading(false)
        }
    }, [])

    const [globalLoading, setGlobalLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        setOpen,
        setLoading: (v: boolean) => setGlobalLoading(v)
    }))

    const footer = useMemo(() => {
        return f ? f : (
            <div className={styles.basalDialogFooter}>
                <Button loading={loading} onClick={() => handler(onOk)} type="primary">确定</Button>
                <Button loading={loading} onClick={() => handler(onCancel)}>取消</Button>
            </div>
        )
    }, [f, loading, handler, onCancel, onOk])

    return (
        <Spin spinning={globalLoading} delay={500}>
            <Modal
                className={classNameJoin(styles.BasalDialog, className)}
                closeIcon={false}
                destroyOnClose
                title={title}
                open={open}
                footer={footer}
                {...other}
            >
                {children}
            </Modal>
        </Spin>
    )
};

export default memo(forwardRef(BasalDialog));