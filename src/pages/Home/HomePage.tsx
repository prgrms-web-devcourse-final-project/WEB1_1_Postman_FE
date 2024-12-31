import { BannerContainer } from '@/components/Common/BannerContainer/BannerContainer';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import { BottomSheetContent } from '@/components/HomePage/BottomSheet/BottomSheetContent';
import { LetterContainer } from '@/components/HomePage/LetterContainer/LetterContainer';
import { WelcomeMessageContainer } from '@/components/HomePage/WelcomeMessageContainer/WelcomeMessageContainer';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { TopButtonContainer } from '@/components/HomePage/TopButtonContainer/TopButtonContainer';
import { getToken, firebaseMessaging, onMessage } from '@/util/firebase';
import { postToken } from '@/service/nofication/postToken';
import { useToastStore } from '@/hooks';
import { Loading } from '@/components/Common/Loading/Loading';
import { ToggleVariant } from '@/constants/toggleVariant';
import { useGetThreeLetterData } from '@/hooks/useGetThreeLetterData';
import { ErrorPage } from '../ErrorPage';

export const HomePage = () => {
    const { addToast } = useToastStore();

    const isToken = localStorage.getItem('isToken');

    useEffect(() => {
        if (isToken === 'true') {
            return;
        }
        const handlePushNotifications = async () => {
            try {
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                    const token = await getToken(firebaseMessaging, {
                        vapidKey: import.meta.env.VITE_FCM_VAPID_KEY
                    });

                    try {
                        const data = await postToken({ token });
                        addToast(`${data.message}`, 'success');
                        localStorage.setItem('isToken', 'true');
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    console.log('Notification permission denied');
                }
            } catch (error) {
                console.error('FCM Error : ', error);
            }
        };

        // 푸시 알림 설정 및 수신 처리
        handlePushNotifications();

        // 푸시 알림 메시지 수신 시 처리
        const unsubscribe = onMessage(firebaseMessaging, (payload) => {
            if (payload.notification) {
                alert(payload.notification.body);
            }
        });

        // 컴포넌트가 언마운트 될 때 리스너 해제
        return () => {
            unsubscribe();
        };
    }, []); // 빈 배열을 의존성으로 사용해 처음 마운트될 때만 실행되게 함

    const { user } = useUserStore();
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(true);

    const { letters, isLoading, isError } = useGetThreeLetterData(toggle);

    function onDismiss() {
        setOpen(false);
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    return (
        <>
            <TopButtonContainer />
            <div className="flex flex-col gap-5">
                <Toggle
                    isChecked={!toggle}
                    onToggle={() => {
                        setToggle(!toggle);
                    }}
                    leftLabel="추천"
                    rightLabel="답장"
                    variant={ToggleVariant.Main}
                />

                <div>
                    <WelcomeMessageContainer
                        nickname={user?.nickname}
                        newLetter={letters.length > 0}
                    />
                    <LetterContainer letters={letters} />
                </div>
                <div className="flex justify-center px-20">
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="w-full h-[49px] text-white flex-center rounded-full bg-sample-blue"
                    >
                        키워드 설정
                    </button>
                </div>

                <div className="mx-[-20px]">
                    <BannerContainer />
                </div>

                <SliderMenuContainer
                    open={open}
                    onDismiss={onDismiss}
                    snapPoints={() => [window.innerHeight * 0.95]}
                >
                    <BottomSheetContent
                        onClick={() => {
                            setOpen(false);
                        }}
                        nickname={user?.nickname}
                    />
                </SliderMenuContainer>
            </div>
        </>
    );
};
