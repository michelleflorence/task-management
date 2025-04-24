import React from "react";
import styles from "./InputField.module.scss";
import { InputProps } from "./InputField.type";

const InputField: React.FC<InputProps> = (props) => (
  <input className={styles["input"]} {...props} />
);

export default InputField;
