import { json } from "../../util/Constants";
import useSound from "use-sound";
import SoundContext from "../SoundContext";
import ResizeContext from "../ResizeContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import RecordsTable from "./RecordsTable";

export default function RecordsContent() {
  return <RecordsTable />;
}
