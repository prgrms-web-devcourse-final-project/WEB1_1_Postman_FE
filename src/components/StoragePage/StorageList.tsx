import React from 'react';

const sampleData: DayGroup[] = [
    {
        date: '2024-12-04',
        letters: [
            {
                title: '오늘의 일상을 공유합니다',
                content:
                    '오늘 카페에서 맛있는 커피를 마셨어요. 날씨가 참 좋았죠.',
                id: '1',
                sender: '김민수',
                receiver: '이지은',
                timestamp: '14:30',
                type: 'sent'
            },
            {
                title: '프로젝트 진행상황 공유',
                content: '현재 개발이 50% 정도 진행되었습니다.',
                id: '2',
                sender: '박지훈',
                receiver: '김민수',
                timestamp: '11:20',
                type: 'sent'
            },
            {
                title: '주말 모임 안내',
                content: '이번 주말에 동창회 모임이 있습니다.',
                id: '3',
                sender: '김민수',
                receiver: '홍길동',
                timestamp: '09:15',
                type: 'sent'
            }
        ]
    },
    {
        date: '2024-12-03',
        letters: [
            {
                title: '생일 축하해요!',
                content: '생일 축하드립니다. 좋은 하루 보내세요!',
                id: '4',
                sender: '이지은',
                receiver: '김민수',
                timestamp: '18:45',
                type: 'received'
            },
            {
                title: '회의록 공유',
                content: '오늘 진행된 회의 내용 공유드립니다.',
                id: '5',
                sender: '김민수',
                receiver: '박지훈',
                timestamp: '16:20',
                type: 'sent'
            }
        ]
    },
    {
        date: '2024-12-02',
        letters: [
            {
                title: '여행 계획 논의',
                content: '다음 달 제주도 여행 계획에 대해 의견 부탁드려요.',
                id: '6',
                sender: '홍길동',
                receiver: '김민수',
                timestamp: '20:10',
                type: 'received'
            }
        ]
    }
];

const mapSampleData: MapDayGroup[] = [
    {
        date: '2024-12-04',
        letters: [
            {
                title: '우리가 처음 만난 곳',
                content: '여기서 처음 마주쳤던 그 순간이 아직도 생생해.',
                id: '1',
                sender: '김민수',
                receiver: '이지은',
                isRead: true,
                timestamp: '14:30',
                type: '보낸 편지',
                locationHint: {
                    hint: '사람들의 발걸음이 분주한 이곳, 초록색 간판이 인상적인 카페가 있어요',
                    latitude: 37.5665,
                    longitude: 126.978,
                    address: '서울시 중구 명동길 12'
                },
                isOpened: true
            },
            {
                title: '비밀스러운 장소',
                content: '우리만 아는 특별한 곳으로 초대할게요.',
                id: '2',
                sender: '박지훈',
                receiver: '김민수',
                isRead: false,
                timestamp: '11:20',
                type: '받은 편지',
                locationHint: {
                    hint: '푸른 나무들 사이로 보이는 하얀 건물, 벤치에 앉아 햇살을 즐길 수 있어요',
                    latitude: 37.5511,
                    longitude: 126.9882,
                    address: '서울시 용산구 녹사평대로 185'
                },
                isOpened: false
            }
        ]
    },
    {
        date: '2024-12-03',
        letters: [
            {
                title: '우리의 첫 데이트',
                content: '이곳에서 보낸 시간이 참 특별했죠.',
                id: '3',
                sender: '이지은',
                receiver: '김민수',
                isRead: true,
                timestamp: '18:45',
                type: '받은 편지',
                locationHint: {
                    hint: '물결치는 강가 근처, 밤에는 반짝이는 조명이 아름다운 곳이에요',
                    latitude: 37.5113,
                    longitude: 126.9975,
                    address: '서울시 서초구 반포대로 42'
                },
                isOpened: true
            }
        ]
    },
    {
        date: '2024-12-02',
        letters: [
            {
                title: '특별한 추억의 장소',
                content: '이곳에서 있었던 일을 기억하나요?',
                id: '4',
                sender: '김민수',
                receiver: '홍길동',
                isRead: true,
                timestamp: '20:10',
                type: '보낸 편지',
                locationHint: {
                    hint: '오래된 건물들 사이에 있는 작은 골목, 벽화가 그려진 계단이 특징이에요',
                    latitude: 37.5834,
                    longitude: 126.9849,
                    address: '서울시 종로구 삼청로 12'
                },
                isOpened: false
            }
        ]
    }
];

type storageType = 'keyword' | 'map' | 'bookmark';
type FilterType = 'sent' | 'received';

const filterLabels = {
    sent: '보낸 편지',
    received: '받은 편지'
} as const;

type StorageListProps = {
    type: storageType;
    filter: FilterType;
};

export const StorageList = ({ type, filter }: StorageListProps) => {
    const getApiEndpoint = (type: storageType, filter: FilterType) => {
        const endpoints = {
            keyword: {
                sent: '/letter/saved/sent',
                received: '/letter/saved/received'
            },
            map: {
                sent: '/map/sent',
                received: '/map/received'
            },
            bookmark: '/map/archived'
        };

        if (type === 'bookmark') {
            return endpoints[type];
        }

        return endpoints[type]?.[filter];
    };

    console.log(getApiEndpoint(type, filter));

    const getFilteredData = (filter: FilterType) => {
        return sampleData
            .map((dayGroup) => ({
                date: dayGroup.date,
                letters: dayGroup.letters.filter((letter) => {
                    return letter.type === filter;
                })
            }))
            .filter((dayGroup) => dayGroup.letters.length > 0);
    };

    const renderList = () => {
        const filteredData = getFilteredData(filter);
        return (
            <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-1 text-sm">
                    <div>
                        <input type="checkbox" value="selectedAll" />
                        <label>전체 선택</label>
                    </div>
                    <button className="bg-sample-gray">삭제</button>
                </div>
                {filteredData.map((dayGroup) => (
                    <div key={dayGroup.date} className="flex flex-col gap-4">
                        {/* 날짜 섹션 */}
                        <div className="text-lg font-medium">
                            {dayGroup.date}
                        </div>
                        {/* 해당 날짜의 편지들 */}
                        <div className="flex flex-col gap-2">
                            {dayGroup.letters.map((letter) => (
                                <div
                                    key={letter.id}
                                    className="flex flex-row gap-2"
                                >
                                    <input type="checkbox" />
                                    <div className="w-full h-[100px] p-4 rounded-lg bg-sample-gray">
                                        <h3 className="font-bold">
                                            {letter.title}
                                        </h3>
                                        <div className="text-sm text-gray-500 mt-2">
                                            {letter.timestamp}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return <div className="">{renderList()}</div>;
};
