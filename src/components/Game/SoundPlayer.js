import React from "react";
import { Howl, Howler } from "howler";
import Sound0 from "../../mp3/sound0.mp3";
import Sound1 from "../../mp3/sound1.mp3";
import Sound2 from "../../mp3/sound2.mp3";
import Sound3 from "../../mp3/sound3.mp3";

const soundsMp3s = [Sound0, Sound1, Sound2, Sound3];

export default function SoundPlayer(props) {
  console.log(props.soundType);
  const sound = new Howl({
    src: [soundsMp3s[props.soundType]],
    loop: false,
  });
  return <>{sound.play()}</>;
}
