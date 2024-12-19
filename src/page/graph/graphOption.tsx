import { graphKindButton } from "../../axios/interface/graph";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import HeartCheckIcon from "../../assets/image/heart_check.svg?raw";
import RunningIcon from "../../assets/image/directions_run.svg?raw";
import SignalIcon from "../../assets/image/vital_signs.svg?raw";
import DownloadIcon from "../../assets/image/download.svg?raw";

const GraphOption = (
  kind: graphKindButton,
  zoomInside: boolean,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  const loginSelector = useSelector<RootState, string>((state) => state.eq);
  const ecgDownloadShow =
    loginSelector == import.meta.env.VITE_API_ADMIN ? true : false;
  const setIconColor = () => {
    return {
      color: "#4D9FC9",
      borderColor: "#4D9FC9",
      borderWidth: 1,
      borderType: "solid",
    };
  };

  const extractPathData = (Icon: string, index?: number) => {
    const parser = new DOMParser();
    const svgDocumnet = parser.parseFromString(Icon, "image/svg+xml");

    const pathElement = svgDocumnet.querySelectorAll("path");
    if (pathElement) {
      const dData = pathElement[index ? index : 0].getAttribute("d");
      return dData;
    }

    return "";
  };

  return {
    opts: {
      width: "100%",
    },

    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const data = params[0];
        return `<div>
                    <b>시간 : ${data.name}</b>
                    <b>값 : ${data.value}</b>
                    </div>`;
      },
    },

    toolbox: {
      show: true,
      orient: "vertical",
      left: "auto",
      top: "middle",
      itemSize: 30,
      itemGap: 32,
      emphasis: {
        iconStyle: {
          color: "#4D9FC9", // 마우스 오버 시 색상
          borderColor: "#4D9FC9",
          borderWidth: 1,
          borderType: "solid",
          textPosition: "bottom",
        },
      },

      feature: {
        myHrvData: {
          show: true,
          title: "진단",
          icon: extractPathData(HeartCheckIcon), // 수정 영역
          iconStyle: kind.bpm_hrv_arr ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("bpm_hrv_arr");
          },
        },
        myLivingData: {
          show: true,
          title: "생활",
          icon: extractPathData(RunningIcon, 1), // 수정 영역
          iconStyle: kind.cal_step ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("cal_step");
          },
        },
        myEcgData: {
          show: true,
          title: "ECG",
          icon: extractPathData(SignalIcon), // 수정 영역
          iconStyle: kind.ecg ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("ecg");
          },
        },
        myEcgDownload: {
          show: kind.ecg && ecgDownloadShow ? true : false,
          title: "다운로드",
          icon: extractPathData(DownloadIcon), // 수정 영역
          onclick: () => {
            downloadECG();
          },
        },
      },
    },

    grid: {
      top: 30,
      bottom: 70,
      left: 50,
      right: 20,
      containLabel: true,
    },

    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 2,
        bottom: 30,
        brushSelect: false,
        handleSize: "0%",
      },
      zoomInside
        ? {
            type: "inside",
          }
        : null,
    ],
  };
};

export const EcgGraphOption = (
  kind: graphKindButton,
  data: any[],
  zoomInside: boolean,
  xaxisFormatter: (item: string, index: number) => void,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  return {
    ...GraphOption(kind, zoomInside, kindButtonHandler, downloadECG),
    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: string, index: number) =>
          xaxisFormatter(value, index),
        interval: 0,
        rotate: 45,
      },
      type: "category",
      data: data.map((item) => item.writetime),
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1000,
    },
    series: [
      {
        data: data.map((item) => item.ecg),
        type: "line",
        smooth: false,
        symbol: "none",
      },
    ],
  };
};

export const HrvGraphOption = (
  kind: graphKindButton,
  data: any[],
  zoomInside: boolean,
  xaxisFormatter: (item: string, index: number) => void,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  return {
    ...GraphOption(kind, zoomInside, kindButtonHandler, downloadECG),
    color: ["#5C7BD9", "#9FE080", "#ff0000"],
    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: string, index: number) =>
          xaxisFormatter(value, index),
        interval: 0,
        rotate: 45,
      },
      type: "category",
      data: data.map((item) => item.writetime),
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
    },
    series: [
      {
        name: "심박 변화율",
        data: data.map((item) => item.hrv),
        type: "line",
        smooth: false,
        symbol: "none",
      },
      {
        name: "심박수",
        data: data.map((item) => item.bpm),
        type: "line",
        smooth: false,
        symbol: "none",
      },
      {
        name: "비정상맥박 지점",
        type: "line",
        markLine: {
          silent: true,
          symbol: "none",
          data: data
            .map((item, index) =>
              item.arr == "1"
                ? {
                    xAxis: index,
                    lineStyle: { type: "solid", color: "red", width: 2 },
                  }
                : null
            )
            .filter((line) => line !== null),
          label: {
            show: false,
          },
        },
        symbol: "none",
      },
    ],

    legend: {
      show: true,
      bottom: 0,
      right: 40,
      orient: "horizontal",
      icon: "rect",
    },
  };
};

export const LivingGraphOption = (
  kind: graphKindButton,
  data: any[],
  zoomInside: boolean,
  xaxisFormatter: (item: string, index: number) => void,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  return {
    ...GraphOption(kind, zoomInside, kindButtonHandler, downloadECG),

    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        formatter: (value: string, index: number) =>
          xaxisFormatter(value, index),
        interval: 0,
        rotate: 45,
      },
      type: "category",
      data: data.map((item) => item.writetime),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "걸음",
        data: data.map((item) => item.step),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
      {
        name: "걸음거리",
        data: data.map((item) => item.distanceKM),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
      {
        name: "칼로리",
        data: data.map((item) => item.cal),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
      {
        name: "활동칼로리",
        data: data.map((item) => item.calexe),
        type: "bar",
        smooth: false,
        symbol: "none",
      },
    ],

    legend: {
      show: true,
      bottom: 0,
      right: 40,
      orient: "horizontal",
      icon: "rect",
    },

    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100,
        bottom: 30,
        brushSelect: false,
        handleSize: "0%",
      },
      {
        type: "inside",
      },
    ],
  };
};
