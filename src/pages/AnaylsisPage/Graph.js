import React from "react";
import { ResponsiveLine } from '@nivo/line'

const Graph  = ({ data, color, id, unit}) => {
  return (
    <ResponsiveLine
    colors={color} 
    theme={{
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
      axisBottom={null}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `${id} (${unit})`,  
        legendOffset: -40,
        legendPosition: 'middle'
    }}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      legends={[]} 
      enableGridX={false}
      enableGridY={false}
      enablePoints={false}
      enableArea={true}
    />
  );
};

export default Graph;



