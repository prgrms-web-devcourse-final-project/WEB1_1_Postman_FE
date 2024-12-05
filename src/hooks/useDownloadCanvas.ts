import { useRef } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

export const useDownloadCanvas = () => {
    const captureRef = useRef<HTMLDivElement>(null);

    const downloadCanvasAsImage = async () => {
        if (!captureRef.current) return;

        try {
            const div = captureRef.current;
            const canvas = await html2canvas(div, { scale: 2 });
            const todayDate = new Date();

            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(
                        blob,
                        `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}.png`
                    );
                }
            });
        } catch (error) {
            console.error('Error converting div to image:', error);
        }
    };

    return { captureRef, downloadCanvasAsImage };
};
