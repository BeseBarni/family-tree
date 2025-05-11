import male1 from "src/assets/males/male_1.png";
import male2 from "src/assets/males/male_11.png";
import male3 from "src/assets/males/male_12.png";
import male4 from "src/assets/males/male_20.png";
import male5 from "src/assets/males/male_38.png";
import male6 from "src/assets/males/male_4.png";
import male7 from "src/assets/males/male_50.png";
import male8 from "src/assets/males/male_9.png";

import female1 from "src/assets/females/female_58.png";
import female2 from "src/assets/females/female_67.png";
import female3 from "src/assets/females/female_72.png";
import female4 from "src/assets/females/female_80.png";
import female5 from "src/assets/females/female_86.png";
import female6 from "src/assets/females/female_94.png";

const males = [male1, male2, male3, male4, male5, male6, male7, male8];

const females = [female1, female2, female3, female4, female5, female6];

export const getRandomMale = () => {
  return males[Math.floor(Math.random() * males.length)];
};

export const getRandomFemale = () => {
  females[Math.floor(Math.random() * females.length)];
};
