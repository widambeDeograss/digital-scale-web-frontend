// src/components/ReceiptModal.tsx
import React from 'react';
import {Modal, Descriptions, Button} from 'antd';

interface ReceiptModalProps {
    visible: boolean;
    onCancel: () => void;
    receiptData: any
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ visible, onCancel, receiptData }) => {
    return (
        <Modal
            title="Receipt"
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered
        >
            <div className="p-4">
                <h1 className="text-lg font-semibold mb-2">Receipt ID: {receiptData?.id}</h1>
                <hr className="my-2" />

                <Descriptions column={1}>
                    <Descriptions.Item label="Crop">{receiptData?.cropSold?.crop?.name}</Descriptions.Item>
                    <Descriptions.Item label="Corporate">{receiptData?.cropSold?.corporate?.name}</Descriptions.Item>
                    <Descriptions.Item label="Sale Date">{receiptData?.saledate}</Descriptions.Item>
                    <Descriptions.Item label="Moisture parcentage">{receiptData?.cropSold?.crop?.moisturePercentage}</Descriptions.Item>
                    <Descriptions.Item label="Quantity (In Kg)">{receiptData?.quantityInKg} kg</Descriptions.Item>
                </Descriptions>

                <div className="text-right mt-4">
                    <p className="text-lg font-semibold text-green-500">Total Pay:{receiptData?.totalPay} Tsh/=</p>
                </div>

                <div className="text-right mt-4">
                    <Button type="primary" onClick={onCancel}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ReceiptModal;

