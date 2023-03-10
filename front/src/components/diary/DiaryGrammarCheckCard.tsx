import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import {
  DBCGrammerBtn,
  DiaryBottomCard,
  DiaryBottomOpenCard,
} from "../../styles/diary/DiaryBottomCard";
import * as Api from "../../api";
import {
  DGCheckCardStyled,
  PBCardItemStyled,
  PBCardWordAlignStyled,
} from "../../styles/personal/PersonalBottomCardStyled";
import { CloudEmp, CloudFull } from "../../assets";

type ClickHandler = (props: boolean) => (e: React.MouseEvent) => void;

const DiaryGrammerCheckCard = (): JSX.Element => {
  const location = useLocation();
  const [isToggle, isSetToggle] = useState(false);
  const [before, setBefore] = useState([]);
  const [grammerBetter, setGrammerBetter] = useState("");
  const { detail } = useParams();
  const [description, setDescription] = useState();
  const [cloud, setCloud] = useState(false);

  useEffect(() => {
    isSetToggle(false);
  }, [location.pathname]);

  useEffect(() => {
    const getDetailPost = async () => {
      try {
        const response = await Api.get(`diaries/${detail}`);
        setDescription(response.data.data.description);
      } catch {
        console.log("연결실패");
      }
    };
    getDetailPost();
  }, [detail, isToggle]);

  const ClickHandler: ClickHandler = (props) => (e) => {
    e.preventDefault();
    isSetToggle(!props);
    onPostGrammar();
  };

  const onPostGrammar = async () => {
    try {
      const res = await Api.post(`diaries/grammerCheck`, {
        description: description,
      });
      setBefore(res.data);
      // console.log(res.data);
    } catch {
      console.log("문법연결실패");
    }
  };

  if (!isToggle) {
    return (
      <>
        <DiaryBottomCard>
          <h3>Grammar Check !</h3>
          <DBCGrammerBtn onClick={ClickHandler(isToggle)}>
            <p>Start</p> <ArrowRightOutlined />
          </DBCGrammerBtn>
        </DiaryBottomCard>
      </>
    );
  } else {
    return (
      <>
        <DiaryBottomOpenCard>
          <div className="DBOC-top">
            <h3>Grammar Check !</h3>

            {/* <InfoCircleOutlined
              onClick={() => {
                setModal(!modal);
              }}
            /> */}
            {/* {modal === true ? <DiaryEmotionInfoModa /> : null} */}
          </div>
          <div className="DBOC-bottom">
            {isToggle && (
              <>
                {before.map((b: any) => {
                  return (
                    <DGCheckCardStyled>
                      <ul className="grammer-result">
                        <li>
                          <CheckCircleOutlined />{" "}
                        </li>
                        <li>{b.before}</li>
                        <li className="gt">
                          <ArrowRightOutlined />
                        </li>
                        {b.better.map((res: any) => {
                          return <li className="b-better">{res}</li>;
                        })}
                      </ul>
                      <p>{b.description.en}</p>
                    </DGCheckCardStyled>
                  );
                })}
              </>
            )}
          </div>

          <DBCGrammerBtn onClick={ClickHandler(isToggle)}>
            <p>Close</p> <ArrowRightOutlined />
          </DBCGrammerBtn>
        </DiaryBottomOpenCard>
      </>
    );
  }
};

export default DiaryGrammerCheckCard;
