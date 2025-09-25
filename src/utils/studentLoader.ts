export interface Student {
  id: string
  name: string
  classYear: string
  wins: number
  totalVotes: number
  imageUrl: string
}

// List of all student image files from the public/students folder
const STUDENT_IMAGES = [
  '449771515_2787439534758569_2028666694449139453_n.jpg',
  '547093714_24440550685594511_4117945424751775118_n.jpg',
  '519647914_1450271162980224_1618164681254790774_n.jpg',
  '461167344_3551958971615213_2821806811065903538_n.jpg',
  '277750648_4924088737712222_7054083220324511552_n.jpg',
  '309429254_5321179781311220_129173422704945243_n.jpg',
  '548309463_24496730156659506_6104916809861892895_n.jpg',
  '516821672_1895386844527465_8235866505974760018_n.jpg',
  '359087679_3492564647639909_9133075089931590218_n.jpg',
  '240655421_4324501364323513_5759570689069046309_n.jpg',
  '532624253_25191937663740503_8668474065504409915_n.jpg',
  '457741628_1877285409405038_8275780207133439143_n.jpg',
  '271957107_2989063431408436_2902082847770216927_n.jpg',
  '354268174_5774167019351994_7749239802548430998_n.jpg',
  '376248172_1817059025363704_3551477721659179417_n.jpg',
  '441202218_797814048963329_5266776067001695202_n.jpg',
  '499225588_2849192321958247_1661685270262993195_n.jpg',
  '497918156_122157139166557021_7833367463207209101_n.jpg',
  '274029102_4878956788859103_1462025821103866386_n.jpg',
  '465891261_8749825681719200_7944654510099138989_n.jpg',
  '472788777_3897717637164476_2111006740174124903_n.jpg',
  '532140719_25047144551555229_659589020015605551_n.jpg',
  '458489066_1173983097164135_216534755886126753_n.jpg'
]

// Generate a name from the image filename
function generateStudentName(imageName: string): string {
  // Extract the first part of the filename (before the first underscore)
  const id = imageName.split('_')[0]
  
  // Create a simple name based on the ID
  const names = [
    'Alex', 'Sofia', 'Magnus', 'Emma', 'Lars', 'Anna', 'Thomas', 'Maria',
    'Erik', 'Camilla', 'Anders', 'Julie', 'Mikkel', 'Nina', 'Jakob', 'Ida',
    'Lucas', 'Maja', 'Oliver', 'Freja', 'Noah', 'Clara', 'William', 'Sara'
  ]
  
  // Use the ID to pick a consistent name
  const nameIndex = parseInt(id) % names.length
  return names[nameIndex] + ' ' + String.fromCharCode(65 + (parseInt(id) % 26)) + '.'
}

// Generate class year based on image filename
function generateClassYear(imageName: string): string {
  const id = parseInt(imageName.split('_')[0])
  const years = ['Class of 2023', 'Class of 2024', 'Class of 2025']
  return years[id % years.length]
}

export function loadStudents(): Student[] {
  return STUDENT_IMAGES.map((imageName) => ({
    id: imageName.split('_')[0], // Use the first part of filename as ID
    name: generateStudentName(imageName),
    classYear: generateClassYear(imageName),
    wins: 0,
    totalVotes: 0,
    imageUrl: `/students/${imageName}`
  }))
}

// Get two random students for initial pairing
export function getRandomPair(students: Student[]): Student[] {
  if (students.length < 2) return []
  
  const shuffled = [...students].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 2)
}

// Get a random student excluding the current pair
export function getRandomStudent(students: Student[], excludeIds: string[]): Student | null {
  const available = students.filter(s => !excludeIds.includes(s.id))
  if (available.length === 0) return null
  
  return available[Math.floor(Math.random() * available.length)]
}
