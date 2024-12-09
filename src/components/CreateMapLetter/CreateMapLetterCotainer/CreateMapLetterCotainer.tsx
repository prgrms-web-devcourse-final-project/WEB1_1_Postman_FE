import { Margin } from '@/components/Common/Margin/Margin';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { TopBar } from '@/components/Common/TopBar/TopBar';
import { ThemeWrapper } from '@/components/CreatLetterPage/ThemeWrapper/ThemeWrapper';
import { SelectSlider } from '@/components/SelectItemPage/SelectSlider/SelectSlider';
import { useAutoSave, useToastStore } from '@/hooks';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage'; // 로컬 스토리지 훅 가져오기

const CreateMapLetterCotainer = () => {
    const { addToast } = useToastStore();

    const { lat, lot } = useParams<{ lat: string; lot: string }>();

    // useLocalStorage 훅을 사용하여 로컬 저장소에 값 저장 및 불러오기
    const { setValue: saveTitle, storedValue: storedTitle } = useLocalStorage(
        'maptitle',
        ''
    );
    const { setValue: saveLetterContent, storedValue: storedContent } =
        useLocalStorage('mapcontent', '');
    const { setValue: saveFont, storedValue: storedFont } = useLocalStorage(
        'mapfont',
        'initial'
    );
    const { setValue: saveLetter, storedValue: storedLetter } = useLocalStorage(
        'mapletter',
        '1'
    );
    const { setValue: saveDescription, storedValue: storedDescription } =
        useLocalStorage('mapdescription', '');

    // 위도와 경도를 로컬 스토리지에 저장
    localStorage.setItem('maplat', lat?.slice(1) || '');
    localStorage.setItem('maplot', lat?.slice(1) || '');

    // 상태 관리
    const [title, setTitle] = useState<string>(storedTitle || '');
    const [letter, setLetter] = useState<string>(storedLetter || '1');
    const [letterContent, setLetterContent] = useState<string>(
        storedContent || ''
    );
    const [font, setFont] = useState<string>(storedFont || 'initial');
    const [description, setDescription] = useState<string>(
        storedDescription || ''
    );

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setTitle(inputValue);
    };

    const saveLetterData = () => {
        saveTitle(title);
        saveLetterContent(letterContent);
        saveFont(font);
        saveLetter(letter);
        saveDescription(description);
    };

    useAutoSave(saveLetterData, 50000);

    return (
        <>
            <TopBar
                handleBackClick={() => {
                    navigate(-1);
                }}
                handleSuccesClick={() => {
                    if (
                        !title.trim() ||
                        !letterContent.trim() ||
                        !description.trim()
                    ) {
                        addToast(
                            '공백을 제외한 제목과 내용을 입력해주세요',
                            'warning'
                        );
                        return;
                    }
                    saveLetterData();
                    navigate('/letter/map/select');
                }}
            />

            <ThemeWrapper themeId={Number(letter)}>
                <>
                    <Margin top={20} />
                    <div className="relative flex flex-col justify-center w-9/12 m-auto py-9">
                        <input
                            onChange={handleChange}
                            value={title}
                            type="text"
                            placeholder="제목을 입력해주세요"
                            className={`z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap ${font ? font : 'font-sans'}`}
                            maxLength={20}
                        />
                        <img src={'/to_line.f4c129e6.svg'} />

                        <div className="relative z-10">
                            <TextArea
                                value={letterContent}
                                setValue={setLetterContent}
                                font={font}
                            />
                        </div>

                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="힌트를 입력해주세요"
                            className={`z-10 w-full bg-transparent border-none focus:border-none focus:outline-none text-wrap ${font ? font : 'font-sans'}`}
                        />
                        <img src={'/to_line.f4c129e6.svg'} />
                    </div>

                    <SelectSlider
                        font={font}
                        letter={letter}
                        setFont={setFont}
                        setLetter={setLetter}
                    />
                </>
            </ThemeWrapper>
        </>
    );
};

export default CreateMapLetterCotainer;
