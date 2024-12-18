import { graphKindButton } from "../../axios/interface/graph";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const GraphOption = (
  kind: graphKindButton,
  zoomInside: boolean,
  kindButtonHandler: (id: string) => void,
  downloadECG: () => void
) => {
  const loginSelector = useSelector<RootState, string>((state) => state.eq);
  const ecgDownloadShow =
    loginSelector == process.env.REACT_APP_ADMIN ? true : false;
  const setIconColor = () => {
    return {
      color: "#4D9FC9",
      borderColor: "#4D9FC9",
      borderWidth: 1,
      borderType: "solid",
    };
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
          icon: "path://M718-322.33 614-426l47-46.67 57 56 141-141L906-511 718-322.33Zm-278-176Zm0 377.66-108.33-98.66q-82-75-137.5-130t-90-100.67q-34.5-45.67-49.34-86.67-14.83-41-14.83-87Q40-715 101.33-777.5q61.34-62.5 152-62.5 55.34 0 103.34 25T440-742.67Q479.33-792 526.33-816t100.34-24q81 0 135.66 51.83 54.67 51.84 69.34 126.84H764q-12-50-48.67-81-36.66-31-88.66-31-51 0-92.67 29.83t-70.33 82.83h-48Q388-713 345.5-743.17q-42.5-30.16-92.17-30.16-63 0-104.83 42.83t-41.83 106.83q0 37 15 73t52.66 82.17q37.67 46.17 102.34 108Q341.33-298.67 440-209.33q30-27 60.67-53.67 30.66-26.67 56.33-49.33l7.33 7.33q7.34 7.33 16.17 15.83 8.83 8.5 16.17 15.84L604-266q-25.33 22.67-56 49.17t-61.33 54.16l-46.67 42Z",
          iconStyle: kind.bpm_hrv_arr ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("bpm_hrv_arr");
          },
        },
        myLivingData: {
          show: true,
          title: "생활",
          icon: "path://M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z",
          iconStyle: kind.cal_step ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("cal_step");
          },
        },
        myEcgData: {
          show: true,
          title: "ECG",
          icon: "path://M362-180q-17 0-30.67-9.67-13.66-9.66-19.33-24.66l-95.33-232.34H45.33v-66.66h218l98.67 242 186-473q5.67-15 19.33-24.67 13.67-9.67 30.67-9.67t30.67 9.67q13.66 9.67 19.33 24.67l95.33 231h171.34v66.66h-218L598-687.33l-186 473q-5.67 15-19.33 24.66Q379-180 362-180Z",
          iconStyle: kind.ecg ? setIconColor() : {},
          onclick: () => {
            kindButtonHandler("ecg");
          },
        },
        myEcgDownload: {
          show: kind.ecg && ecgDownloadShow ? true : false,
          title: "다운로드",
          icon: "path://M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z",
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
