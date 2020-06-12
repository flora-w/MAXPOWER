import merge from 'lodash/merge';

import * as COLOR from 'constants/colors';

const basePieOption = {
  title: {
    textStyle: {
      color: COLOR.LABEL_TEXT,
      fontSize: 20,
    },
    x: 'center',
    y: 'center',
  },
  series: {
    type: 'pie',
    data: [],
    radius: ['50%', '70%'],
    label: {
      normal: {
        show: false,
      },
    },
  },
};

const sampleInput = {
  title: '13',
  dist: {
    class1: 9,
    class2: 2,
    class3: 2,
  },
  color: [COLOR.BLUE, COLOR.YELLOW, COLOR.RED],
};

export default function({ title, dist, color } = sampleInput) {
  const data = Object.keys(dist).map(name => {
    const value = dist[name];
    return { value, name };
  });

  const option = {
    color,
    title: typeof title === 'string' ? { text: title } : title,
    series: { data },
  };

  return merge(option, basePieOption);
}
