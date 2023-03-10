import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DiaryValueType } from "../../pages/DiaryPage";

import { diaryState, DiaryTypes } from "../../stores/DiaryAtom";
import { DiaryListAlign } from "../../styles/diary/DiarySide";
import DiaryItem from "./DiaryItem";
import * as Api from "../../api";
import { useRecoilState } from "recoil";

const DiaryList = (): JSX.Element => {
  const [diarys, setDiarys] = useRecoilState(diaryState);
  const { detail } = useParams();

  useEffect(() => {
    const getDiaryData = async () => {
      const response = await Api.get(`diaries`);
 
      if (response.status !== 200) {
      } else {
        delete response.data.data.count;
        const diaries = Object.values(response.data.data);
  
        setDiarys(diaries as DiaryTypes[]);
      }
    };
    getDiaryData();
  }, [diarys.length, setDiarys]);

  return (
    <>
      <DiaryListAlign>
        {diarys.map((diary: DiaryTypes) => {
          const { id, date, title, description } = diary;
          return (
            <Link key={id} to={`/diary/${id}`}>
              <DiaryItem
                key={id}
                id={id}
                date={date}
                title={title}
                description={description}
              />
            </Link>
          );
        })}
      </DiaryListAlign>
    </>
  );
};

export default DiaryList;
