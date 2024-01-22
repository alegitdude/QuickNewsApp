import { useDispatch, useSelector } from "react-redux";
import { api } from "../Api/agent";
import DotLoader from "../assets/DotLoader";
import { RootState } from "../state/store";
import { UserState } from "../models/user";
import { addSource, removeSource } from "../state/userSlice";
import { useEffect } from "react";

type Props = {
  source: string;
  starting: boolean;
};
const SingleSource = (props: Props) => {
  const { useEditUserSourcesMutation } = api;
  const { source } = props;
  const [editUserSources, { isLoading, isSuccess }] =
    useEditUserSourcesMutation();
  const dispatch = useDispatch();
  const user: UserState = useSelector((store: RootState) => store.user);

  useEffect(() => {
    if (isSuccess) {
      if (user.omittedSources.includes(source)) {
        dispatch(removeSource(source));
      } else {
        dispatch(addSource(source));
      }
    }
  }, [isSuccess, source, dispatch]);

  return (
    <div>
      <div
        className={`flex-col md:flex-row  flex py-3 border-2 shadow-sm  ${
          user.omittedSources.includes(source) == true
            ? " shadow-[0_0_10px_2px_rgba(255,46,46,0.87)]"
            : "shadow-md"
        } `}
      >
        <div className="hidden sm:block sm:basis-4/12"></div>
        <div className="flex items-center justify-center basis-4/12">
          <h1 className="text-lg ">{source}</h1>
        </div>

        <div className="flex items-center justify-center md:justify-end basis-4/12">
          {isLoading && <DotLoader />}
          {isLoading ? (
            ""
          ) : user.omittedSources.includes(source) == true ? (
            <div className="mr-0 overflow-hidden shadow-2xl md:mr-2">
              <button
                onClick={() => {
                  editUserSources(source);
                  //   setTempList(tempList.filter((aSource) => aSource != source));
                }}
                className="hover:after:transition-all shadow-2xl after:transition-all after:duration-500 hover:after:duration-500 hover:after:ease-in-out hover:after:-translate-y-10 relative mt-1 rounded-md  px-3.5 py-2  text-sm font-semibold text-white  bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent after:block after:bg-red-600 after:content-['Blocked'] after:z-100 after:absolute after:top-0 after:w-full after:-translate-x-3.5 after:py-2 after:rounded-md "
              >
                Allow?
              </button>
            </div>
          ) : (
            <div className="mr-0 overflow-hidden shadow-2xl md:mr-2">
              <button
                onClick={() => {
                  editUserSources(source);
                }}
                className="hover:after:transition-all shadow-2xl after:transition-all after:duration-500 hover:after:duration-500 hover:after:ease-in-out hover:after:-translate-y-10 relative mt-1 rounded-md  px-3.5 py-2  text-sm font-semibold text-white  bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent after:block after:bg-primary after:content-['Allowed'] after:z-100 after:absolute after:top-0 after:w-full after:-translate-x-3.5 after:py-2 after:rounded-md "
              >
                Block?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleSource;
