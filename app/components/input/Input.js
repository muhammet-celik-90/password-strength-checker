"use client";

import { useState } from "react";
import styles from "./input.module.css";
import InfoIcon from "@mui/icons-material/Info";
import { Popover, Typography } from "@mui/material";

export default function Input() {
  let [result, setResult] = useState(0);
  const [lowLetter, setLowLetter] = useState(false);
  const [upperLetter, setUpperLetter] = useState(false);
  const [digit, setDigit] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    let password = e.target.value;
    let valueLength = password.length;
    let valueLengthStatus;
    valueLength > 7
      ? ((valueLengthStatus = true), setPasswordLength(true))
      : ((valueLengthStatus = false), setPasswordLength(false));

    const patternLowerLetter = /[a-z]/;
    const patternUpperLetter = /[A-Z]/;
    const patternDigit = /[0-9]/;
    const patternSpecial = /[!@#$%^&*]/;

    const resultLowerLetter = patternLowerLetter.test(password);
    resultLowerLetter ? setLowLetter(true) : setLowLetter(false);

    const resultUpperLetter = patternUpperLetter.test(password);
    resultUpperLetter ? setUpperLetter(true) : setUpperLetter(false);

    const resultDigit = patternDigit.test(password);
    resultDigit ? setDigit(true) : setDigit(false);

    const resultSpecial = patternSpecial.test(password);
    resultSpecial ? setSpecialChar(true) : setSpecialChar(false);

    const strength =
      resultLowerLetter +
      resultUpperLetter +
      resultDigit +
      resultSpecial +
      valueLengthStatus;
    setResult(strength);
  };

  return (
    <div className={styles.inputArea}>
      <input type="text" className={styles.inp} onChange={handleChange} />
      <div className={styles.screen}>
        <div className={styles.popoverHeader}>
          <span>Strength</span>
          <InfoIcon
            sx={{
              cursor: "pointer",
            }}
            aria-describedby={id}
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Typography
              sx={{ px: 2, pt: 2, pb: 1, background: "gray", fontSize: "14px" }}
            >
              <span className={lowLetter ? styles.invalid : styles.valid}>
                At least 1 low letter required
              </span>
            </Typography>
            <Typography
              sx={{ px: 2, py: 1, background: "gray", fontSize: "14px" }}
            >
              <span className={upperLetter ? styles.invalid : styles.valid}>
                At least 1 upper letter required
              </span>
            </Typography>
            <Typography
              sx={{ px: 2, py: 1, background: "gray", fontSize: "14px" }}
            >
              <span className={digit ? styles.invalid : styles.valid}>
                At least 1 digit required
              </span>
            </Typography>
            <Typography
              sx={{ px: 2, py: 1, background: "gray", fontSize: "14px" }}
            >
              <span className={passwordLength ? styles.invalid : styles.valid}>
                Must be at least 8 characters
              </span>
            </Typography>
            <Typography
              sx={{ px: 2, pt: 1, pb: 2, background: "gray", fontSize: "14px" }}
            >
              <span className={specialChar ? styles.invalid : styles.valid}>
                At least 1 special character required
              </span>
            </Typography>
          </Popover>
        </div>
        <span
          className={styles.progress}
          style={{
            backgroundColor:
              result === 1
                ? "crimson"
                : result === 2
                ? "#F3442A"
                : result === 3
                ? "#ECE06A"
                : result === 4
                ? "#04C197"
                : result === 5
                ? "rgb(1, 116, 45)"
                : "transparent",
            width:
              result === 1
                ? "20%"
                : result === 2
                ? "40%"
                : result === 3
                ? "60%"
                : result === 4
                ? "80%"
                : result === 5
                ? "100%"
                : "100%",
          }}
        ></span>
      </div>
    </div>
  );
}
