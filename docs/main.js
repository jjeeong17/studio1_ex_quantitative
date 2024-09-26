const body = d3.select('body').style('padding', '30px');

const width = 1920;
const height = 6150;

const svg = body
  .append('svg')
  .attr('viewBox', `0 0 ${width} ${height}`)
  .attr('width', width)
  .attr('height', height)
  .style('box-shadow', '0px 1px 2px #DDDDDD');

// Array of depth section information
const depthSections = [
  { label: '0m', depthStart: 0, depthEnd: 5, yStart: 150, yEnd: 615 },
  { label: '5m', depthStart: 5, depthEnd: 10, yStart: 615, yEnd: 1230 },
  { label: '10m', depthStart: 10, depthEnd: 15, yStart: 1230, yEnd: 1845 },
  { label: '15m', depthStart: 15, depthEnd: 20, yStart: 1845, yEnd: 2460 },
  { label: '20m', depthStart: 20, depthEnd: 50, yStart: 2460, yEnd: 3315 },
  { label: '50m', depthStart: 50, depthEnd: 100, yStart: 3315, yEnd: 4065 },
  { label: '100m', depthStart: 100, depthEnd: 200, yStart: 4065, yEnd: 4770 },
  { label: '200m', depthStart: 200, depthEnd: 1000, yStart: 4770, yEnd: 5600 },
  {
    label: '1000m',
    depthStart: 1000,
    depthEnd: 5393,
    yStart: 5600,
    yEnd: 6140,
  },
];

// Define the gradient
const gradient = svg
  .append('defs')
  .append('linearGradient')
  .attr('id', 'blue-gradient')
  .attr('x1', '0%')
  .attr('y1', '0%')
  .attr('x2', '0%')
  .attr('y2', '100%'); // Vertical gradient from top to bottom

// Define the gradient color stops with the adjusted blend for smoother transitions
gradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffffff'); // Top 150px white space
gradient.append('stop').attr('offset', '2.44%').attr('stop-color', '#a8e6ff'); // Start of the gradient

// 0-5m
gradient.append('stop').attr('offset', '15.71%').attr('stop-color', '#a8e6ff');
gradient.append('stop').attr('offset', '17%').attr('stop-color', '#85d3f2'); // Blend Start
gradient.append('stop').attr('offset', '32.48%').attr('stop-color', '#85d3f2');

// 5-10m
gradient.append('stop').attr('offset', '32.48%').attr('stop-color', '#85d3f2');
gradient.append('stop').attr('offset', '34%').attr('stop-color', '#5fbce7'); // Blend Start
gradient.append('stop').attr('offset', '45.05%').attr('stop-color', '#5fbce7');

// 10-15m
gradient.append('stop').attr('offset', '45.05%').attr('stop-color', '#5fbce7');
gradient.append('stop').attr('offset', '47%').attr('stop-color', '#3aa4d8'); // Blend Start
gradient.append('stop').attr('offset', '60.62%').attr('stop-color', '#3aa4d8');

// 15-20m
gradient.append('stop').attr('offset', '60.62%').attr('stop-color', '#3aa4d8');
gradient.append('stop').attr('offset', '62%').attr('stop-color', '#1d8abc'); // Blend Start
gradient.append('stop').attr('offset', '79.30%').attr('stop-color', '#1d8abc');

// 20-50m
gradient.append('stop').attr('offset', '79.30%').attr('stop-color', '#1d8abc');
gradient.append('stop').attr('offset', '81%').attr('stop-color', '#146b99'); // Blend Start
gradient.append('stop').attr('offset', '84.81%').attr('stop-color', '#146b99');

// 50-100m
gradient.append('stop').attr('offset', '84.81%').attr('stop-color', '#146b99');
gradient.append('stop').attr('offset', '86%').attr('stop-color', '#0f4d72'); // Blend Start
gradient.append('stop').attr('offset', '88.31%').attr('stop-color', '#0f4d72');

// 100-200m
gradient.append('stop').attr('offset', '88.31%').attr('stop-color', '#0f4d72');
gradient.append('stop').attr('offset', '90%').attr('stop-color', '#0b3451'); // Blend Start
gradient.append('stop').attr('offset', '97.92%').attr('stop-color', '#0b3451');

// 200-1000m
gradient.append('stop').attr('offset', '97.92%').attr('stop-color', '#0b3451');
gradient.append('stop').attr('offset', '99%').attr('stop-color', '#071d36'); // Blend Start
gradient.append('stop').attr('offset', '100%').attr('stop-color', '#071d36'); // End

// Use the gradient as the background fill
svg
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'url(#blue-gradient)');

// 툴팁 요소 생성
const tooltip = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('background-color', 'white')
  .style('border', '1px solid #ccc')
  .style('padding', '10px')
  .style('border-radius', '5px')
  .style('box-shadow', '0px 0px 10px rgba(0,0,0,0.1)')
  .style('display', 'none'); // 초기에는 보이지 않도록 설정
// Add the title text
svg
  .append('text')
  .attr('x', 45)
  .attr('y', 66)
  .attr('text-anchor', 'start')
  .style('font-size', '29px')
  .style('fill', 'black')
  .style('font-family', 'Comfortaa')
  .text('Distribution of Fish Feeding Habits by Depth');

// Add labels for each depth section to the SVG
depthSections.forEach((section) => {
  svg
    .append('text')
    .attr('x', 10)
    .attr('y', section.yStart)
    .attr('fill', '#ed8645')
    .attr('font-size', '16px')
    .style('font-family', 'Comfortaa')
    .text(section.label);
});

// Array of color, label, and position information for each group
const groups = [
  { label: 'Top Predators', color: '#e57373', x: 1220 },
  { label: 'Midwater Feeders', color: '#ffa726', x: 1360 },
  { label: 'Seafloor Hunters', color: '#81c784', x: 1510 },
  { label: 'Plant Eaters', color: '#fff176', x: 1650 },
  { label: 'Miscellaneous', color: '#ba68c8', x: 1780 },
];

// Add a group to contain the labels
const legendGroup = svg.append('g').attr('transform', 'translate(0, 60)');

// Add the 'Group by' text
legendGroup
  .append('text')
  .attr('x', 1040)
  .attr('y', 20)
  .attr('font-size', '20px')
  .attr('fill', '#000')
  .style('font-family', 'Comfortaa')
  .text('Group by');

// Add circles and labels for each group
groups.forEach((group) => {
  // Add the circle
  legendGroup
    .append('circle')
    .attr('cx', group.x)
    .attr('cy', 0)
    .attr('r', 25)
    .attr('fill', group.color)
    .style('cursor', 'pointer')
    .on('click', function () {
      // 클릭 이벤트에서 filterDataByGroup 함수를 호출합니다.
      filterDataByGroup(group.label);
    });

  // 현재 선택된 그룹을 저장할 변수
  let currentGroup = null;

  // Function to display data only for the clicked group
  function filterDataByGroup(groupName) {
    console.log(`Filtering data for group: ${groupName}`);

    // 클릭된 그룹이 이미 선택된 그룹인지 확인하여 토글 기능 구현
    if (currentGroup === groupName) {
      // 이미 선택된 그룹을 다시 클릭한 경우, 필터 해제 (모든 원 보이기)
      currentGroup = null;
      svg
        .selectAll('.fish-dot')
        .transition()
        .duration(500)
        .style('opacity', 0.7)
        .style('display', 'block') // 모든 원 보이기
        .style('pointer-events', 'auto'); // 원 클릭 가능하도록 설정
    } else {
      // 새로운 그룹 선택
      currentGroup = groupName;
      svg
        .selectAll('.fish-dot')
        .transition()
        .duration(500)
        .style('opacity', function (d) {
          return d.mappedGroup === groupName ? 0.7 : 0;
        })
        .style('display', function (d) {
          return d.mappedGroup === groupName ? 'block' : 'none';
        })
        .style('pointer-events', function (d) {
          return d.mappedGroup === groupName ? 'auto' : 'none';
        });
    }
  }

  // Add the label
  legendGroup
    .append('text')
    .attr('x', group.x)
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .attr('dy', '1.5em')
    .attr('font-size', '14px')
    .style('font-family', 'Comfortaa')
    .attr('fill', '#000')
    .text(group.label);
});

// Function to display data only for the clicked group
function filterDataByGroup(groupName) {
  console.log(`Filtering data for group: ${groupName}`);
  // Add your data filtering logic here
  // Example: d3.selectAll('.fish-dot').style('opacity', d => mapGroupLabel(d.ecological_group) === groupName ? 1 : 0.1);
}

// Define the color scale
const colorScale = d3
  .scaleOrdinal()
  .domain(groups.map((d) => d.label))
  .range(groups.map((d) => d.color));

// Function to map 'ecological_group' in data to group labels
function mapGroupLabel(ecologicalGroup) {
  switch (ecologicalGroup) {
    case 'Apex Predators':
      return 'Top Predators';
    case 'Midwater Fish':
      return 'Midwater Feeders';
    case 'Benthopelagic Fish':
      return 'Seafloor Hunters';
    case 'Omnivorous/Herbivorous':
    case 'Omnivorous/Herbivorous Fish':
      return 'Plant Eaters';
    case 'Other Ecological Roles':
    default:
      return 'Miscellaneous';
  }
}

// 커스텀 깊이 스케일 함수
function depthScale(depth) {
  for (let i = 0; i < depthSections.length; i++) {
    const section = depthSections[i];
    if (depth >= section.depthStart && depth <= section.depthEnd) {
      // 해당 깊이 구간 내에서 선형 보간
      const depthRatio =
        (depth - section.depthStart) / (section.depthEnd - section.depthStart);
      const yPosition =
        section.yStart + depthRatio * (section.yEnd - section.yStart);
      return yPosition;
    }
  }
  // 깊이가 정의된 구간에 없을 경우, 가장 가까운 구간의 y 좌표를 반환
  if (depth < depthSections[0].depthStart) {
    return depthSections[0].yStart;
  } else {
    return depthSections[depthSections.length - 1].yEnd;
  }
}

// Load the data and plot the dots
d3.json('final_data.json').then(function (data) {
  // 데이터 전처리
  data.forEach(function (d) {
    d.cleanDepth = +d.cleanDepth || 0; // 깊이 값을 숫자로 변환
    d.mappedGroup = mapGroupLabel(d.ecological_group);
    d.name = d.name || 'Unknown';
    d.tax_order = d.tax_order || 'Unknown';
    d.tax_class = d.tax_class || 'Unknown';
    d.link = d.link || '#';
  });

  // Plot the dots
  svg
    .selectAll('.fish-dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'fish-dot')
    .attr('cx', function (d) {
      // Distribute dots horizontally within a margin
      return Math.random() * (width - 100) + 50;
    })
    .attr('cy', function (d) {
      return depthScale(d.cleanDepth);
    })
    .attr('r', 5)
    .attr('fill', function (d) {
      return colorScale(d.mappedGroup);
    })
    .attr('opacity', 0.7)
    .style('display', 'block') // 초기에는 모든 원을 보이도록 설정
    .on('click', function (event, d) {
      // 이벤트 전파 중지
      event.stopPropagation();

      // 툴팁 내용 설정
      tooltip
        .html(
          `
      <strong>Name:</strong> ${d.name}<br>
      <strong>Order:</strong> ${d.tax_order}<br>
      <strong>Class:</strong> ${d.tax_class}<br>
      <strong>Depth:</strong> ${d.cleanDepth} m<br>
      <a href="${d.link}" target="_blank">More Information</a>
      `
        )

        .style('left', event.pageX + 10 + 'px') // 마우스 위치에 따라 툴팁 위치 설정
        .style('top', event.pageY + 10 + 'px')
        .style('display', 'block'); // 툴팁 보이기
    });
});
