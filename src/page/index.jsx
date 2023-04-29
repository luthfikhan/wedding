/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ConfigProvider, Input, Modal, message } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpen,
  faHeart,
  faMusic,
  faChevronDown,
  faGift,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faCopy,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import TextArea from "antd/es/input/TextArea";

const Main = () => {
  const [open, setOpen] = useState(true);
  const [isPlaying, setIsPlating] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalBank, setOpenModalBank] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [comments, setComments] = useState([]);
  const url = new URL(window.location);
  const to = url.searchParams.get("to")?.replace(/\+/g, " ");
  const [name, setName] = useState(to);
  const [comment, setComment] = useState("");

  const toUpRefs = useRef([]);
  const mempelaiContainerRef = useRef({});
  const mempelaiWanitaRef = useRef({});
  const mempelaiPriaRef = useRef({});
  const scheduleRefs = useRef([]);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getComments = async () => {
    try {
      const response = await fetch("http://103.139.193.205:9000/comments");
      const json = await response.json();

      if (response.status === 200) {
        setComments(json.data);
      }
    } catch (error) {
      console.log(error);
      messageApi.error("Maaf terjadi kesalahan");
    }
  };

  const submitComments = async () => {
    try {
      const response = await fetch("http://103.139.193.205:9000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          to,
          comment,
        }),
      });
      const json = await response.json();

      if (response.ok) {
        setComment("");
        getComments();
      }

      messageApi.info(json.message);
    } catch (error) {
      console.log(error);
      messageApi.error("Maaf terjadi kesalahan");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    const observerToUp = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("up-transition-on");
            entry.target.classList.remove("up-transition-off");
          } else {
            entry.target.classList.remove("up-transition-on");
            entry.target.classList.add("up-transition-off");
          }
        });
      },
      { threshold: 0.5, rootMargin: "9999px 0px -20px 0px" }
    );

    for (let i = 0; i < toUpRefs.current.length; i++) {
      const element = toUpRefs.current[i];
      observerToUp.observe(element);
    }

    return () => {
      for (let i = 0; i < toUpRefs.current.length; i++) {
        const element = toUpRefs.current[i];
        observerToUp.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    const observerToRight = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mempelaiWanitaRef.current.classList.add(styles.sweepLeftOn);
            mempelaiWanitaRef.current.classList.remove(styles.sweepLeftOff);
            mempelaiPriaRef.current.classList.add(styles.sweepRightOn);
            mempelaiPriaRef.current.classList.remove(styles.sweepRightOff);
          } else {
            mempelaiWanitaRef.current.classList.remove(styles.sweepLeftOn);
            mempelaiWanitaRef.current.classList.add(styles.sweepLeftOff);
            mempelaiPriaRef.current.classList.remove(styles.sweepRightOn);
            mempelaiPriaRef.current.classList.add(styles.sweepRightOff);
          }
        });
      },
      { threshold: 0.5, rootMargin: "9999px 0px -20px 0px" }
    );

    observerToRight.observe(mempelaiContainerRef.current);

    return () => {
      observerToRight.unobserve(mempelaiContainerRef.current);
    };
  }, []);

  useEffect(() => {
    const observerSchedule = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.transitionOpacityOn);
            entry.target.classList.remove(styles.transitionOpacityOff);
          } else {
            entry.target.classList.remove(styles.transitionOpacityOn);
            entry.target.classList.add(styles.transitionOpacityOff);
          }
        });
      },
      { threshold: 0.5, rootMargin: "9999px 0px -20px 0px" }
    );

    for (let i = 0; i < scheduleRefs.current.length; i++) {
      const element = scheduleRefs.current[i];
      observerSchedule.observe(element);
    }

    return () => {
      for (let i = 0; i < scheduleRefs.current.length; i++) {
        const element = scheduleRefs.current[i];
        observerSchedule.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const countDownDate = new Date("2023-05-07T09:00:00+07:00").getTime();
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playMusic = () => {
    document.getElementById("audioPlayer").play();
    setIsPlating(true);
  };

  const stopMusix = () => {
    document.getElementById("audioPlayer").pause();
    setIsPlating(false);
  };

  const hideModal = () => {
    playMusic();
    setOpen(false);
  };

  // eslint-disable-next-line no-unreachable
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff3d00",
          colorFillSecondary: "rgba(35,55,87,1)",
        },
      }}
    >
      <Modal
        open={open}
        closable={false}
        footer={null}
        centered
        maskStyle={{
          backgroundColor: "rgba(35,55,87,1)",
        }}
        className={styles.modal}
      >
        <div className={"flex items-center justify-center flex-col py-6"}>
          <FontAwesomeIcon icon={faHeart} color="rgba(35,55,87,1)" />
          <p className="my-4">
            <span>Wedding Announcement</span>
          </p>
          <div className={styles.modalCoupleText}>
            <p>Luthfi & Fika</p>
          </div>
          <p className="font-semibold mt-4">Dear ❝{to}❞</p>
          <p className="my-3">❝ Let us share our happiness ❞</p>
          <Button
            icon={<FontAwesomeIcon icon={faEnvelopeOpen} className="mr-2" />}
            className="mt-2"
            onClick={hideModal}
          >
            Open Invitation
          </Button>
          <div className="flex items-center mt-4">
            <FontAwesomeIcon icon={faMusic} className="mr-2" size="sm" />
            <p>Asmalibrasi - Soegi Bornean</p>
          </div>
        </div>
      </Modal>

      <div>
        <audio id="audioPlayer">
          <source src="/music/music.mp3" type="audio/mp3" />
        </audio>
        <div
          className="fixed bottom-[20%] right-4 cursor-pointer"
          onClick={isPlaying ? stopMusix : playMusic}
        >
          <FontAwesomeIcon
            icon={isPlaying ? faPauseCircle : faPlayCircle}
            className="text-3xl"
            color="rgba(35,55,87,0.8)"
          />
        </div>
        {contextHolder}
        <div
          className={[
            "h-screen flex items-center justify-center",
            styles.firstPage,
          ].join(" ")}
        >
          <div
            className="p-6 mx-8 rounded-3xl flex flex-col items-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.84)",
              width: "min(100%, 600px)",
            }}
          >
            <p className="mb-4">Wedding Invitation</p>
            <div className={styles.coupleText}>
              <p>Luthfi & Fika</p>
            </div>
            <p>Minggu, 7 Mei 2023</p>
          </div>
          <a
            className="absolute bottom-8 z-10 cursor-pointer"
            href="#invitation"
          >
            <FontAwesomeIcon icon={faChevronDown} beatFade />
          </a>
        </div>
        <div
          id="invitation"
          className="min-h-screen flex items-center justify-center flex-col p-8"
        >
          <div
            style={{
              width: "min(100%, 700px)",
            }}
            className="text-center"
          >
            <p className="font-scriptlatin text-6xl font-bold text-primary mb-4">
              Bismillah
            </p>
            <span className="text-primary text-sm">
              <p
                ref={(el) => (toUpRefs.current[0] = el)}
                className="mb-3 up-transition-off"
              >
                Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
              </p>
              <p
                ref={(el) => (toUpRefs.current[1] = el)}
                className="mb-3 up-transition-off"
              >
                Dengan rahmat dan ridho Allah SWT, dengan segala kerendahan hati
                dan rasa syukur yang tiada terhingga, kami bermaksud
                menyelenggarakan acara pernikahan kami.
              </p>
              <p
                ref={(el) => (toUpRefs.current[2] = el)}
                className="mb-3 up-transition-off"
              >
                Kami, Luthfi Khoirul Anwar dan Fika Ayu Nurfitria, merasa sangat
                berbahagia dan terhormat untuk bisa mengajak saudara/i sekalian
                hadir dalam momen istimewa ini, di mana kami akan mengikat janji
                suci pernikahan di hadapan Allah SWT, keluarga, dan
                sahabat-sahabat terdekat.
              </p>
              <p
                ref={(el) => (toUpRefs.current[3] = el)}
                className="mb-3 up-transition-off"
              >
                Dalam kesempatan yang semoga penuh barokah ini, kami berharap
                kehadiran saudara/i sekalian akan memberikan doa restu dan
                kebahagiaan bagi kami berdua.
              </p>
              <p
                ref={(el) => (toUpRefs.current[4] = el)}
                className="mb-3 up-transition-off"
              >
                Terima kasih atas perhatian dan kesediaan saudara/i sekalian
                untuk hadir dan turut memperingati acara pernikahan kami.
              </p>
              <p
                ref={(el) => (toUpRefs.current[5] = el)}
                className="mb-3 up-transition-off"
              >
                Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh.
              </p>
            </span>
          </div>
        </div>
        <div className="flex items-center flex-col">
          <div
            className="flex items-center flex-col px-8 text-sm mb-4"
            style={{ width: "min(100%, 700px)" }}
          >
            <img
              ref={(el) => (toUpRefs.current[6] = el)}
              className="w-16 h-16"
              src="/images/love-birds.png"
            />
            <p
              className="text-center mt-8"
              ref={(el) => (toUpRefs.current[7] = el)}
            >
              ❝ Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
              untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung
              dan merasa tenteram kepadanya, dan dijadikan- Nya diantaramu rasa
              kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar
              terdapat tanda-tanda bagi kaum yang berfikir. ❞
            </p>
            <p
              className="mt-4 font-bold"
              ref={(el) => (toUpRefs.current[8] = el)}
            >
              (QS. Ar-Rum ayat 21)
            </p>
          </div>
          <div
            ref={mempelaiContainerRef}
            className="bg-repeat overflow-hidden rounded-md border-white border-4 shadow-md my-8 text-center flex-col md:flex-row flex"
            style={{
              backgroundImage: "url('/images/Cream-Bg.jpg')",
              width: "min(90%, 900px)",
            }}
          >
            <div
              ref={mempelaiPriaRef}
              className="my-4 flex items-center justify-center w-full bg-[rgba(35,55,87,0.81)] p-4 text-white flex-col min-h-[200px]"
            >
              <p className="text-white text-3xl font-[Sacramento] ">
                Luthfi Khoirul Anwar
              </p>
              <p className="text-white opacity-90 text-xs">
                Putra dari pasangan
              </p>
              <p className="text-white text-sm">
                Bapak Tugiyo & Ibu Siti Aminah
              </p>
              <a
                className="opacity-80 flex items-center mt-1"
                href="https://www.instagram.com/luthfikhann/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                <span className="text-white text-sm">@luthfikhann</span>
              </a>
            </div>
            <div className="flex items-center justify-center w-full p-8">
              <span
                className="font-[Rochester] text-8xl"
                style={{ textShadow: "0em 0.1em 0.1em rgba(0,0,0,0.4)" }}
              >
                &
              </span>
            </div>
            <div
              ref={mempelaiWanitaRef}
              className="my-4 flex items-center justify-center w-full bg-[rgba(35,55,87,0.81)] p-4 text-white flex-col min-h-[200px]"
            >
              <p className="text-white text-3xl font-[Sacramento] ">
                Fika Ayu Nurfitria
              </p>
              <p className="text-white opacity-90 text-xs">
                Putri dari pasangan
              </p>
              <p className="text-white text-sm">Bapak Mariyo & Ibu Saminem</p>
              <a
                className="opacity-80 flex items-center mt-1"
                href="https://www.instagram.com/fi_fikkaayu/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                <span className="text-white text-sm">@fi_fikkaayu</span>
              </a>
            </div>
            <div></div>
          </div>
          <div className="mt-8 flex items-center flex-col w-full">
            <p className="font-bold text-3xl font-[Sacramento]">
              Hari Yg ditunggu
            </p>
            <div
              style={{
                width: "min(90%, 500px)",
              }}
              className="flex justify-evenly text-center items-center mt-4"
            >
              <div>
                <p className="text-lg font-semibold">{countdown.days}</p>
                <p className="text-sm">Days(s)</p>
              </div>
              <p>:</p>
              <div>
                <p className="text-lg font-semibold">{countdown.hours}</p>
                <p className="text-sm">Hour(s)</p>
              </div>
              <p>:</p>
              <div>
                <p className="text-lg font-semibold">{countdown.minutes}</p>
                <p className="text-sm">Minute(s)</p>
              </div>
              <p>:</p>
              <div>
                <p className="text-lg font-semibold">{countdown.seconds}</p>
                <p className="text-sm">Second(s)</p>
              </div>
            </div>
          </div>
          <div
            className="bg-repeat overflow-hidden rounded-md border-white border-4 shadow-md my-8 text-center flex-col md:flex-row flex"
            style={{
              backgroundImage: "url('/images/Cream-Bg.jpg')",
              width: "min(90%, 900px)",
            }}
          >
            <div
              ref={(el) => (scheduleRefs.current[0] = el)}
              className="w-auto md:w-full m-4"
            >
              <div className="rounded-md flex items-center justify-center w-full bg-[rgba(35,55,87,0.81)] p-4 text-white flex-col min-h-[200px]">
                <p className="text-white text-3xl font-[Sacramento] ">
                  Akad Nikah
                </p>
                <p className="text-white opacity-90 text-xs">
                  09.00 WIB - Selesai
                </p>
                <p className="text-white text-sm">Minggu, 7 Mei 2023</p>
                <p className="text-white opacity-90 text-xs mt-2">
                  Rumah mempelai wanita
                </p>
                <p className="text-white text-sm">Kersan Weru Sukoharjo</p>
              </div>
              <a
                href="https://goo.gl/maps/g8Tme7eGX5uMXCWV6"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-full bg-[rgba(35,55,87,0.81)] rounded-md mt-2 text-white text-sm p-1">
                  Lihat Lokasi
                </div>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://calendar.google.com/calendar/r/eventedit?text=Akad+Luthfi-Fika&dates=20230507T090000/20230507T100000&ctz=Asia/Jakarta&location=https://goo.gl/maps/g8Tme7eGX5uMXCWV6"
              >
                <div className="w-full bg-[rgba(35,55,87,0.81)] rounded-md mt-2 text-white text-sm p-1">
                  Simpan Tanggal
                </div>
              </a>
            </div>

            <div
              ref={(el) => (scheduleRefs.current[1] = el)}
              className="w-auto md:w-full m-4"
            >
              <div className="rounded-md flex items-center justify-center w-full bg-[rgba(35,55,87,0.81)] p-4 text-white flex-col min-h-[200px]">
                <p className="text-white text-3xl font-[Sacramento] ">
                  Resepsi
                </p>
                <p className="text-white opacity-90 text-xs">
                  10.00 WIB - Selesai
                </p>
                <p className="text-white text-sm">Minggu, 7 Mei 2023</p>
                <p className="text-white opacity-90 text-xs mt-2">
                  Rumah mempelai wanita
                </p>
                <p className="text-white text-sm">Kersan Weru Sukoharjo</p>
              </div>
              <a
                href="https://goo.gl/maps/g8Tme7eGX5uMXCWV6"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-full bg-[rgba(35,55,87,0.81)] rounded-md mt-2 text-white text-sm p-1">
                  Lihat Lokasi
                </div>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://calendar.google.com/calendar/r/eventedit?text=Resepsi+Luthfi-Fika&dates=20230507T100000/20230507T120000&ctz=Asia/Jakarta&location=https://goo.gl/maps/g8Tme7eGX5uMXCWV6"
              >
                <div className="w-full bg-[rgba(35,55,87,0.81)] rounded-md mt-2 text-white text-sm p-1">
                  Simpan Tanggal
                </div>
              </a>
            </div>

            <div
              ref={(el) => (scheduleRefs.current[2] = el)}
              className="w-auto md:w-full m-4"
            >
              <div className="rounded-md flex items-center justify-center w-full bg-[rgba(35,55,87,0.81)] p-4 text-white flex-col min-h-[200px]">
                <p className="text-white text-3xl font-[Sacramento] ">
                  Ngunduh Mantu
                </p>
                <p className="text-white opacity-90 text-xs">
                  10.00 WIB - Selesai
                </p>
                <p className="text-white text-sm">Senin, 8 Mei 2023</p>
                <p className="text-white opacity-90 text-xs mt-2">
                  Rumah mempelai pria
                </p>
                <p className="text-white text-sm">Kandren Weru Sukoharjo</p>
              </div>
              <a
                href="https://goo.gl/maps/JTwJBSsr4Ug5Da556"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-full bg-[rgba(35,55,87,0.81)] rounded-md mt-2 text-white text-sm p-1">
                  Lihat Lokasi
                </div>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://calendar.google.com/calendar/r/eventedit?text=Ngunduh+Mantu+Luthfi-Fika&dates=20230508T100000/20230508T120000&ctz=Asia/Jakarta&location=https://goo.gl/maps/JTwJBSsr4Ug5Da556"
              >
                <div className="w-full bg-[rgba(35,55,87,0.81)] rounded-md mt-2 text-white text-sm p-1">
                  Simpan Tanggal
                </div>
              </a>
            </div>
          </div>
          <div className="mt-8 flex items-center flex-col">
            <Modal
              footer={null}
              open={openModalAddress}
              onCancel={() => setOpenModalAddress(false)}
              centered
            >
              <div className="flex flex-col items-center">
                <p className="mb-5 font-bold text-lg">Alamat Penerima</p>
                <div>
                  {[
                    {
                      name: "Luthfi Khoirul Anwar",
                      address:
                        "Kandren 02/01 Kel. Weru Kec. Weru Kab. Sukoharjo 57562",
                    },
                    {
                      name: "Fika Ayu Nurfitria",
                      address:
                        "Kersan 03/05 Kel. Weru Kec. Weru Kab. Sukoharjo 57562",
                    },
                  ].map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center flex-col text-center p-10 mb-4 rounded-md"
                        style={{
                          backgroundImage:
                            "linear-gradient(125deg,#ffffff 0%,#d1d1d1 100%)",
                        }}
                      >
                        <p>{item.name}</p>
                        <p>{item.address}</p>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(item.address);
                            messageApi.info("Alamat berhasil disalin");
                          }}
                          className="cursor-pointer flex rounded-md py-2 px-6 mt-4 items-center bg-[#666]"
                        >
                          <FontAwesomeIcon
                            icon={faCopy}
                            color="white"
                            size="1x"
                            className="mr-2"
                          />
                          <span className="text-white text-sm">
                            Salin Alamat
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Modal>
            <Modal
              footer={null}
              open={openModalBank}
              onCancel={() => setOpenModalBank(false)}
              centered
            >
              <div className="flex flex-col items-center w-full">
                <p className="mb-5 font-bold text-lg">No Rekening</p>
                <div className="w-full">
                  {[
                    {
                      name: "Luthfi Khoirul Anwar",
                      bank: "bca",
                      number: "8265248779",
                    },
                    {
                      name: "Fika Ayu Nurfitria",
                      bank: "bri",
                      number: "690801015265532",
                    },
                  ].map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center flex-col text-center p-10 mb-4 rounded-md"
                        style={{
                          backgroundImage:
                            "linear-gradient(125deg,#ffffff 0%,#d1d1d1 100%)",
                        }}
                      >
                        <img
                          className="w-32 relative -top-6 left-1/3"
                          src={
                            item.bank === "bca"
                              ? "/images/logo-bca.png"
                              : "/images/Bank-BRI.png"
                          }
                        />
                        <p>{item.name}</p>
                        <p>{item.number}</p>
                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(item.number);
                            messageApi.info("No rekening berhasil disalin");
                          }}
                          className="cursor-pointer flex rounded-md py-2 px-6 mt-4 items-center bg-[#666]"
                        >
                          <FontAwesomeIcon
                            icon={faCopy}
                            color="white"
                            size="1x"
                            className="mr-2"
                          />
                          <span className="text-white text-sm">
                            Salin Alamat
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Modal>
            <FontAwesomeIcon
              icon={faGift}
              size="3x"
              color="rgba(35,55,87,0.81)"
            />
            <p className="mt-4 font-bold text-2xl">Amplop</p>
            <p className="font-[RoyalWedding] text-7xl relative -top-6 left-8 text-[rgba(57,61,67,0.65)]">
              Digital
            </p>
            <div className="flex px-8 text-center">
              <div
                onClick={() => setOpenModalAddress(true)}
                className="cursor-pointer bg-primary px-4 py-2 rounded-md max-w-[12rem] flex items-center justify-center"
              >
                <FontAwesomeIcon className="mr-2" icon={faGift} color="white" />
                <span className="text-white text-sm">Kirim Hadiah</span>
              </div>
              <div
                onClick={() => setOpenModalBank(true)}
                className="cursor-pointer bg-primary px-4 py-2 rounded-md ml-4 max-w-[12rem] flex items-center justify-center"
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faCreditCard}
                  color="white"
                />
                <span className="text-white text-sm">Transfer Bank</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-[#233757] mt-12">
            <div className="bg-white m-8 rounded-lg p-4">
              <p className="text-sm text-center">
                Tinggalkan pesan atau do&apos;a untuk kami
              </p>
              <Input
                className="mt-6"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextArea
                className="mt-4"
                rows={4}
                placeholder="Pesan"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div
                onClick={submitComments}
                className="w-full cursor-pointer bg-primary px-4 py-2 rounded-md text-center mt-4"
              >
                <span className="text-white text-sm">Submit</span>
              </div>
              <div className="pt-4">
                {comments.map((item, i) => {
                  return (
                    <div key={i} className="mt-4">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm">{item.comment}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-center mb-8">
              <p className="text-white">Terima Kasih</p>
              <p className="text-white font-[RoyalWedding] text-6xl">
                Luthfi & Fika
              </p>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Main;
