import {
  prefix
} from '../../constants'

export function setupNameExtension(base) {
  return {
    name: {
      owned: async (ownerAddress) => {
        return base.get(`/testchain/name`)
      },
      create: async (name) => {
        return base.post(`/testchain/name/`, name)
      },
      set: async (name) => {
        base.put(`/testchain/name/`, name)
      },
    },
  };
}