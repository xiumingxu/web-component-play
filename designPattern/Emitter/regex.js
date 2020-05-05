const pattern = new RegExp(/(\d+@)\1*/);

console.log(pattern.exec('1@23@'));

'string'.match(pattern);

const pattern2 = new RegExp(/\d{4}(-|,)\d{2}\1\d{2}}*/g);
