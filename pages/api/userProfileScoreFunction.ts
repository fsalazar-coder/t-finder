
export const userProfileScoreFunction = (data: any, request: string) => {

  const maxPoints: any = {
    experience: 40,
    education: 70,
    courses: 30,
    publications: 20,
    conferences: 20,
    certifications: 30,
    recommendations: 15
  };

  const experienceYearsPoints: any = {
    '0-2': 10,
    '2-5': 20,
    '5-10': 30,
    '+10': 40
  };

  const educationDegreePoints: any = {
    'High school': 10,
    'Bachelor': 20,
    'Master': 30,
    'Doctorate': 40
  };

  let scores: any = {
    experience: 0,
    education: 0,
    courses: 0,
    publications: 0,
    conferences: 0,
    certifications: 0,
    recommendations: 0
  }
  const calculateScore = (elementLength: any, pointsPerItem: any, maxPoints: any) => {
    return Math.min(elementLength * pointsPerItem, maxPoints);
  };

  data.forEach((element: any) => {
    let elementData = element.data;
    let elementLength: number = element.length;
    let elementEmpty: boolean = elementLength === 0;
    switch (element.id) {
      case 'experience':
        if (!elementEmpty) {
          elementData.map((experienceData: any) => {
            scores.experience += experienceYearsPoints[experienceData['experience_years']] || 0;
          })
        }
        break;
      case 'education':
        if (!elementEmpty) {
          elementData.map((educationData: any) => {
            scores.education += educationDegreePoints[educationData['degree']] || 0;
          })
        }
        break;
      case 'courses':
        scores.courses += calculateScore(elementLength, 5, maxPoints.courses);
        break;
      case 'publications':
        scores.publications += calculateScore(elementLength, 4, maxPoints.conferences);
        break;
      case 'conferences':
        scores.conferences += calculateScore(elementLength, 4, maxPoints.conferences);
        break;
      case 'certifications':
        scores.certifications += calculateScore(elementLength, 6, maxPoints.certifications);
        break;
      case 'recommendations':
        scores.recommendations += calculateScore(elementLength, 3, maxPoints.recommendations);
        break;
      default:
        break;
    }
  });

  const getSum: any = (entry: any) => Object.values(entry).reduce((total: any, value: any) => total + value, 0);
  const getOverview = () => Object.entries(scores).map(([key, value]: any) => ({
    profileItem: key.charAt(0).toUpperCase() + key.slice(1),
    scoreItem: value,
    maxPointItem: maxPoints[key],
    percentage: Math.min(Math.round((value / maxPoints[key]) * 100), 100)
  }));
  const scoreProfile: any = getSum(scores);
  const scoreProfileMax: any = getSum(maxPoints);

  switch (request) {
    case 'score':
      return scoreProfile;
    case 'score overall':
      return ({
        scoreProfile,
        scoreProfileMax,
        percentage: Math.min(Math.round((scoreProfile / scoreProfileMax) * 100), 100)
      });
    case 'score overview':
      return getOverview();
    default:
      break
  }
  return
}