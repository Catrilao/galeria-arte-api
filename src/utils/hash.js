import bcrypt from 'bcrypt'

const hash = async (input) => {
  return await bcrypt.hash(input, 10)
}

export default hash
