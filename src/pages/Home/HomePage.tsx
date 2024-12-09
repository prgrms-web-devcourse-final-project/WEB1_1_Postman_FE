import { BannerContainer } from '@/components/Common/BannerContainer/BannerContainer';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { Toggle } from '@/components/Common/Toggle/Toggle';
import { BottomSheetContent } from '@/components/HomePage/BottomSheet/BottomSheetContent';
import { LetterContainer } from '@/components/HomePage/LetterContainer/LetterContainer';
import { WelcomeMessageContainer } from '@/components/HomePage/WelcomeMessageContainer/WelcomeMessageContainer';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect, useState } from 'react';
import { useGetRecommendLetter } from '@/hooks/useGetRecommendLetter';
import { useGetRecentRelyLetter } from '@/hooks/useGetRecentRelyLetter';
import { TopButtonContainer } from '@/components/HomePage/TopButtonContainer/TopButtonContainer';
import { getToken, firebaseMessaging, onMessage } from '@/util/firebase';
import { postToken } from '@/service/nofication/postToken';
import { useToastStore } from '@/hooks';

export type ReplyLetter = {
    type: 'MAP' | 'KEYWORD';
    labelUrl: string;
    letterId: number;
};

export type RecommendLetter = {
    letterId: number;
    title: string;
    label: string;
};

export const HomePage = () => {
    const { user } = useUserStore();
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

    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [letters, setLetters] = useState<ReplyLetter[] | RecommendLetter[]>(
        []
    );

    function onDismiss() {
        setOpen(false);
    }

    const {
        // data: recommendedLetterData,
        refetch: refetchRecommendedLetters,
        isLoading: isRecommendedLetterLoading,
        isError: isRecommendedLetterError
    } = useGetRecommendLetter();

    const {
        // data: recentRelyLetterData,
        refetch: refetchRecentRelyLetters,
        isLoading: isRecentRelyLetterLoading,
        isError: isRecentRelyLetterError
    } = useGetRecentRelyLetter();

    useEffect(() => {
        if (toggle) {
            refetchRecommendedLetters().then((response) => {
                setLetters(response?.data?.result || []);
            });
        } else {
            refetchRecentRelyLetters().then((response) => {
                setLetters(response?.data?.result || []);
            });
        }
    }, [toggle, refetchRecommendedLetters, refetchRecentRelyLetters]);

    if (isRecommendedLetterLoading || isRecentRelyLetterLoading) {
        return <p>로딩 중...</p>;
    }

    if (isRecommendedLetterError || isRecentRelyLetterError) {
        return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
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
