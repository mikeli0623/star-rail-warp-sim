import { useContext, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { json } from "../../util/Constants";
import SoundContext from "../context/SoundContext";
import ResizeContext from "../context/ResizeContext";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ResourceTotal from "./ResourceTotal";

export default function BannerStat({
  type,
  state,
  bannerState,
  setBannerState,
}) {
  const { getWidth, getHeight } = useContext(ResizeContext);
  const { t, i18n } = useTranslation();

  const { sound, useSound } = useContext(SoundContext);

  const [playToggleOn] = useSound("/assets/audio/sfx/toggle-on.mp3", {
    volume: 0.9,
  });
  const [playToggleOff] = useSound("/assets/audio/sfx/toggle-off.mp3");

  const [rateFive, setRateFive] = useState(state["rateFive"] * 100);
  const [rateFour, setRateFour] = useState(state["rateFour"] * 100);
  const [maxPity, setMaxPity] = useState(state["maxPity"]);
  const [softPity, setSoftPity] = useState(state["softPity"]);
  const [guaranteeFive, setGuaranteeFive] = useState(state["guaranteeFive"]);
  const [guaranteeFour, setGuaranteeFour] = useState(state["guaranteeFour"]);
  const [pityFive, setPityFive] = useState(state["pityFive"]);
  const [pityFour, setPityFour] = useState(state["pityFour"]);

  useEffect(() => {
    setRateFive(Math.round(state["rateFive"] * 100 * 100) / 100);
    setRateFour(Math.round(state["rateFour"] * 100 * 100) / 100);
    setMaxPity(state["maxPity"]);
    setSoftPity(state["softPity"]);
    setGuaranteeFive(state["guaranteeFive"]);
    setGuaranteeFour(state["guaranteeFour"]);
    setPityFive(state["pityFive"]);
    setPityFour(state["pityFour"]);
  }, [state, setBannerState, bannerState]);

  const localStore = useCallback(
    (suffix, value) => {
      switch (type) {
        case "beginner":
          localStorage.setItem("beg" + suffix, value);
          break;
        case "char":
          localStorage.setItem("char" + suffix, value);
          break;
        case "weap":
          localStorage.setItem("weap" + suffix, value);
          break;
        default:
          localStorage.setItem("stand" + suffix, value);
          break;
      }
    },
    [type]
  );

  useEffect(() => {
    let banner = state;
    banner.rateFive = rateFive / 100;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("RateFive", rateFive / 100);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, rateFive, localStore]);

  useEffect(() => {
    let banner = state;
    banner.rateFour = rateFour / 100;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("RateFour", rateFour / 100);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, rateFour, localStore]);

  useEffect(() => {
    let banner = state;
    banner.maxPity = maxPity;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("HardPity", maxPity);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, maxPity, localStore]);

  useEffect(() => {
    let banner = state;
    banner.softPity = softPity;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("SoftPity", softPity);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, softPity, localStore]);

  useEffect(() => {
    let banner = state;
    banner.guaranteeFive = guaranteeFive;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("GuaranteeFive", guaranteeFive);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, guaranteeFive, localStore]);

  useEffect(() => {
    let banner = state;
    banner.guaranteeFour = guaranteeFour;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("GuaranteeFour", guaranteeFour);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, guaranteeFour, localStore]);

  useEffect(() => {
    let banner = state;
    banner.pityFive = pityFive;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("PityFive", pityFive);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, pityFive, localStore]);

  useEffect(() => {
    let banner = state;
    banner.pityFour = pityFour;
    let bannerStateClone = bannerState;
    bannerStateClone[type] = banner;
    localStore("PityFour", pityFour);
    setBannerState(bannerStateClone);
  }, [state, bannerState, setBannerState, type, pityFour, localStore]);

  const handleChangeRate = (event, setValue) => {
    const inputValue = event.target.value;
    // Remove any trailing dots or multiple consecutive dots
    const sanitizedValue = inputValue.replace(/(\..*)\./g, "$1");
    if (sanitizedValue === "" || sanitizedValue === "-") {
      setValue(0); // Set to zero if input is empty or just a negative sign
    } else {
      // Validate the input with up to 2 decimal places
      const regex = /^\d+(\.\d{0,2})?$/;
      if (!regex.test(sanitizedValue)) {
        return; // Ignore invalid input
      }
      const parsedValue = parseFloat(sanitizedValue);
      if (isNaN(parsedValue) || parsedValue < 0) {
        setValue(0); // Set to zero if input is negative or NaN
      } else if (parsedValue > 100) {
        setValue(100); // Set to 100 if input is greater than 100
      } else {
        setValue(sanitizedValue);
      }
    }
  };

  const handleChangePityFive = (event) => {
    const inputValue = event.target.value;

    if (inputValue.includes(".")) {
      return; // Ignore input if it contains a decimal point
    }

    const parsedValue = parseInt(inputValue, 10);

    if (
      isNaN(parsedValue) ||
      parsedValue < 0 ||
      !Number.isInteger(parsedValue)
    ) {
      return setPityFive(0);
    }

    if (parsedValue > 1000) {
      setPityFive(1000); // Set to 1000 if input is greater than 1000
    } else {
      setPityFive(inputValue.replace(/^0+/, ""));
    }
  };

  const handleChangePityFour = (event) => {
    const inputValue = event.target.value;

    if (inputValue.includes(".")) {
      return; // Ignore input if it contains a decimal point
    }

    const parsedValue = parseInt(inputValue, 10);

    if (
      isNaN(parsedValue) ||
      parsedValue < 0 ||
      !Number.isInteger(parsedValue)
    ) {
      return setPityFour(0);
    }

    if (parsedValue > 1000) {
      setPityFour(1000); // Set to 1000 if input is greater than 1000
    } else {
      setPityFour(inputValue.replace(/^0+/, ""));
    }
  };

  const handleChangePityHard = (event) => {
    const inputValue = event.target.value;

    if (inputValue.includes(".")) {
      return; // Ignore input if it contains a decimal point
    }

    const parsedValue = parseInt(inputValue, 10);

    if (
      isNaN(parsedValue) ||
      parsedValue < 0 ||
      !Number.isInteger(parsedValue)
    ) {
      setMaxPity(0);
      setSoftPity(0);
      return;
    }

    if (parsedValue > 1000) {
      setMaxPity(1000); // Set to 1000 if input is greater than 1000
    } else {
      setMaxPity(inputValue.replace(/^0+/, ""));
      setSoftPity(Math.min(softPity, inputValue.replace(/^0+/, "")));
    }
  };

  const handleChangePitySoft = (event) => {
    const inputValue = event.target.value;

    if (inputValue.includes(".")) {
      return; // Ignore input if it contains a decimal point
    }

    const parsedValue = parseInt(inputValue, 10);

    if (
      isNaN(parsedValue) ||
      parsedValue < 0 ||
      !Number.isInteger(parsedValue)
    ) {
      return setSoftPity(0);
    }

    if (parsedValue > 1000) {
      setSoftPity(1000);
      setMaxPity(1000); // Set to 1000 if input is greater than 1000
    } else {
      setMaxPity(Math.max(maxPity, inputValue.replace(/^0+/, "")));
      setSoftPity(inputValue.replace(/^0+/, ""));
    }
  };

  const handleSwitch = (setSwitch) => {
    setSwitch((prev) => {
      if (sound) prev ? playToggleOff() : playToggleOn();
      return !prev;
    });
  };

  const [total, setTotal] = useState(
    parseInt(localStorage.getItem(type + "Total")) || 0
  );

  useEffect(() => {
    setTotal(parseInt(localStorage.getItem(type + "Total")) || 0);
  }, [type]);

  return (
    <div className="px-4 py-2 w-100 d-flex flex-column align-items-center">
      <div className="w-100 d-flex justify-content-between align-items-center">
        <h1
          style={{
            textAlign: "left",
            alignSelf: "flex-start",
            fontSize: getWidth(40),
          }}
        >
          {type === "beginner"
            ? t("banner.beg.title")
            : type === "char"
            ? t("modal.vers.event1")
            : type === "weap"
            ? t("modal.vers.event2")
            : json.getTitle("1.0.1", type, i18n.resolvedLanguage)}
        </h1>
        <ResourceTotal
          type={`sr${["char", "weap"].includes(type) ? "s" : ""}-pass`}
          amount={total * (type === "beginner" ? 0.8 : 1)}
        />
      </div>

      <div style={{ width: "95%" }}>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="rate-5"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.rateFive")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125, 110) }}>
            <Form.Control
              id="rate-5"
              style={{ height: getHeight(40, 125, 28) }}
              type="number"
              value={rateFive}
              step="0.1"
              min="0"
              max="100"
              aria-label="rate-five"
              aria-describedby="rate-five"
              onChange={(e) => handleChangeRate(e, setRateFive)}
            />
            <InputGroup.Text
              id="rate-five"
              style={{ height: getHeight(40, 125, 28) }}
            >
              %
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="rate-4"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.rateFour")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125, 110) }}>
            <Form.Control
              id="rate-4"
              style={{ height: getHeight(40, 125, 28) }}
              type="number"
              value={rateFour}
              step="0.1"
              min="0"
              max="100"
              aria-label="rate-four"
              aria-describedby="rate-four"
              onChange={(e) => handleChangeRate(e, setRateFour)}
            />
            <InputGroup.Text
              id="rate-four"
              style={{ height: getHeight(40, 125, 28) }}
            >
              %
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="hard-pity-5"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.maxPity")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125, 90) }}>
            <Form.Control
              id="hard-pity-5"
              style={{ height: getHeight(40, 125, 28) }}
              type="number"
              value={maxPity}
              step="1"
              min="0"
              max="1000"
              aria-label="max-pity"
              aria-describedby="max-pity"
              onChange={handleChangePityHard}
            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="soft-pity-5"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.softPity")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125, 90) }}>
            <Form.Control
              id="soft-pity-5"
              style={{ height: getHeight(40, 125, 28) }}
              type="number"
              value={softPity}
              step="1"
              min="0"
              max="1000"
              aria-label="soft-pity"
              aria-describedby="soft-pity"
              onChange={handleChangePitySoft}
            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="current-pity-5"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.pityFive")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125, 90) }}>
            <Form.Control
              id="current-pity-5"
              style={{ height: getHeight(40, 125, 28) }}
              type="number"
              value={pityFive}
              step="1"
              min="0"
              max={maxPity}
              aria-label="pity-five"
              aria-describedby="pity-five"
              onChange={handleChangePityFive}
            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="current-pity-4"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.pityFour")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125, 90) }}>
            <Form.Control
              id="current-pity-4"
              style={{ height: getHeight(40, 125, 28) }}
              type="number"
              value={pityFour}
              step="1"
              min="0"
              max="100"
              aria-label="pity-four"
              aria-describedby="pity-four"
              onChange={handleChangePityFour}
            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="g5-switch"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.guaranteeFive")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125) }}>
            <Form.Check
              id="g5-switch"
              type="switch"
              checked={guaranteeFive}
              onChange={() => handleSwitch(setGuaranteeFive)}
            />
          </InputGroup>
        </div>
        <div className="d-flex justify-content-between align-items-center p-2 stat-info">
          <Form.Label
            htmlFor="g4-switch"
            style={{
              marginBottom: 0,
              color: "#87888a",
              fontSize: getWidth(28),
            }}
          >
            {t("stats.guaranteeFour")}
          </Form.Label>
          <InputGroup style={{ width: getWidth(125) }}>
            <Form.Check
              id="g4-switch"
              type="switch"
              checked={guaranteeFour}
              onChange={() => handleSwitch(setGuaranteeFour)}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
