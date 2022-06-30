import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button, BackButton } from "../components/Buttons.js";
import TextDesc from "../components/TextDesc.js";
import ProgressBar from "../components/ProgressBar";
import FormFill from "../components/FormFill";
import Calendar from "../components/Calendar";
import Carousel from "../components/Carousel";
import {
  getUserData,
  postUserData,
  patchUserData,
} from "../services/axiosUsers";
import { USER_URL, PATCH_USER_URL } from "../utilities/constants";

export default function Passport() {
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState({}); //can be used to store all family members detail
  const [passportDate, setPassportDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState(new Date());
  const [curGender, setCurGender] = useState("MALE");
  const [onEdit, setOnEdit] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); //handle selected index of carousel
  const [familyArray, setFamilyArray] = useState([]); //to store family data for state change of carousel
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let userData;
  let phoneNumber = localStorage.getItem("phoneNumber");
  let isFamily = localStorage.getItem("isFamily") === "true";

  //on first render do GET request
  useEffect(() => {
    console.log("useEffect invoked");
    try {
      setOnEdit(location.state.onEdit);
    } catch (error) {
      console.error(error);
    }

    getUserData(USER_URL, phoneNumber)
      .then((response) => {
        // iterate through response.data and find where the phone_number == phoneNumber
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].phone_number == phoneNumber) {
            userData = response.data[i];
          }
        }
        setDetails({
          full_name: userData.full_name,
          passport_no: userData.passport_no,
          nationality: userData.nationality,
        });

        details["passport_expiry"] !== undefined
          ? setPassportDate(new Date())
          : setPassportDate(new Date(userData.passport_expiry));

        details["dob"] !== undefined
          ? setBirthDate(new Date())
          : setBirthDate(new Date(userData.dob));

        details["gender"] === undefined
          ? setCurGender("MALE")
          : setCurGender(userData.gender);

        reset({
          full_name: userData.full_name,
          passport_no: userData.passport_no,
          title: userData.title,
          nationality: userData.nationality,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    data["passport_expiry"] = passportDate;
    data["dob"] = birthDate;
    data["gender"] = curGender;

    patchUserData(PATCH_USER_URL, data, phoneNumber)
      .then((response) => {
        if (onEdit === true) {
          navigate("/review");
          setOnEdit(false);
        } else {
          navigate("/review"); //TODO replace with next page route for sprint 3, when expanding to more pages
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    console.log(errors);
  };

  const toggleGenderToMale = () => {
    if (curGender === "FEMALE") {
      setCurGender("MALE");
    }
  };
  const toggleGenderToFemale = () => {
    if (curGender === "MALE") {
      setCurGender("FEMALE");
    }
  };

  //TODO: finish up logic for carousel view
  //need to post data between different selection of carousel view
  const onClickSelected = (index) => {
    console.log("onClickSelected invoked: ", index);
    setSelectedIndex(index);
    //1. post request to update database
    //2. update details state?
  };
  console.log("selectedIndex is this: ", selectedIndex);
  console.log("isFamily is this: ", isFamily);
  console.log("isFamily is this: ", typeof isFamily);
  console.log("isFamily true? ", isFamily === true);

  //TODO: delete mock data after testings
  let nameArray = [
    { name: "test1", passport_no: "123" },
    { name: "test2", passport_no: "456" },
    { name: "test3", passport_no: "789" },
  ];

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 h-16 bg-white w-screen z-10" />
      <div className="fixed flex flex-row top-0 left-0 right-0 z-50">
        <BackButton onClick={() => navigate("/details")} />
        <ProgressBar percent="66%" />
      </div>

      <TextDesc
        headerText="Fill up your passport details"
        bodyText="important for us verify bla bla"
      />

      <div className="absolute left-0 right-0 top-36 items-center ">
        {isFamily === true ? (
          <Carousel
            nameArr={nameArray}
            onClickSelected={onClickSelected}
            selectedIndex={selectedIndex}
          />
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="mx-8">
          <div>
            <label className="block font-medium">Upload Passport</label>
            <input
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
              type="file"
              placeholder="Passport"
              {...register("Passport", {})}
            />
          </div>

          <FormFill
            id="full_name"
            text="Full Name"
            type="text"
            onFill={register("full_name", {})}
          />

          <FormFill
            id="passport_no"
            text="Passport Number"
            type="text"
            onFill={register("passport_no", {})}
          />

          <div className="mb-3">
            <label className="block font-medium">Passport Expiry (MM/YY)</label>
            <div>
              <Calendar
                curDate={passportDate}
                setDate={setPassportDate}
                startYear={2020}
                endYear={2050}
              />
            </div>
          </div>

          <FormFill
            text="Nationality"
            type="text"
            onFill={register("nationality", {})}
          />

          <div className="mb-3">
            <label className="block font-medium">Gender</label>
            <div className="flex justify-around">
              <button
                type="button"
                className={`${
                  curGender == "MALE" ? "bg-red-200" : "bg-gray-100"
                } w-1/2 h-10 rounded-md m-1`}
                onClick={toggleGenderToMale}
              >
                MALE
              </button>
              <button
                type="button"
                className={`${
                  curGender == "FEMALE" ? "bg-red-200" : "bg-gray-100"
                } w-1/2 h-10 rounded-md m-1`}
                onClick={toggleGenderToFemale}
              >
                FEMALE
              </button>
            </div>
          </div>

          <div>
            <label className="block font-medium">
              Date of Birth (DD/MM/YYYY)
            </label>
            <Calendar
              curDate={birthDate}
              setDate={setBirthDate}
              startYear={1900}
              endYear={2022}
            />
          </div>
          <Button
            name="next"
            text={onEdit === true ? "Save" : "Next"}
            bgColor="bg-red-500"
            hoverColor="hover:bg-red-700"
            onClick={onSubmit}
          />
        </form>
      </div>
    </div>
  );
}
