import React from "react";
import { ResponsiveLine } from '@nivo/line'

const Graph  = ({ data, color, id}) => {
  return (
    <ResponsiveLine
    colors={color}  // color를 props로 받아서 설정해줍니다.
    theme={{  // theme에서 x, y축 글씨 색을 바꿔줍니다.
      textColor: "white",
    }}
      data={data}
      width={585}
      height={382}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false}}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0, // tickRotation 값이 바뀝니다.
        legend: 'time',  // legend 값이 바뀝니다.
        legendOffset: 36,
        legendPosition: 'middle'
    }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: id,  // legend 값이 바뀝니다.
        legendOffset: -40,
        legendPosition: 'middle'
    }}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      legends={[]} // 그래프 오른쪽의 포인트를 지워줍니다.
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      enableArea={true}
    />
  );
};

export default Graph;

// 그래프 라이브러리에 높이 값을 주지 않으면 그래프가 나타나지 않습니다.
// 높이값을 꼭 주세요!

