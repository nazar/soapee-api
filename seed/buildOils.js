var sapyOils = {
    caprylic: '8:0',
    capric: '10:0',
    lauric: '12:0',
    myristic: '14:0',
    palmitic: '16:0',
    stearic: '18:0',
    ricinoleic: '18:1',
    oleic: '18:1',
    linoleic: '18:2',
    linolenic: '18:3',
    eicosenoic: '20:1',
    docosenoid: '22:1',
    erucic: '22:1',
    docosadienoic: '22:2'
};

var oils = [
    { name:  "Abyssinian Oil" , ins: 70 , iodine: 98 , lauric: 0 , linoleic: 11 , linolenic: 4 , myristic: 0 , oleic: 18 , palmitic:  3 , ricinoleic:  0 , stearic: 2 , sap: 0.168 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Almond Butter" , ins: 118 , iodine: 70 , lauric: 0 , linoleic: 16 , linolenic: 0 , myristic: 1 , oleic: 58 , palmitic:  9 , ricinoleic:  0 , stearic: 15 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Almond Oil, sweet" , ins: 97 , iodine: 99 , lauric: 0 , linoleic: 18 , linolenic: 0 , myristic: 0 , oleic: 71 , palmitic:  7 , ricinoleic:  0 , stearic: 0 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Aloe Butter" , ins: 241 , iodine: 9 , lauric: 45 , linoleic: 2 , linolenic: 0 , myristic: 18 , oleic: 7 , palmitic:  8 , ricinoleic:  0 , stearic: 3 , sap: 0.24 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Andiroba Oil,karaba,crabwood" , ins: 120 , iodine: 68 , lauric: 0 , linoleic: 9 , linolenic: 0 , myristic: 0 , oleic: 51 , palmitic:  28 , ricinoleic:  0 , stearic: 8 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Apricot Kernal Oil" , ins: 91 , iodine: 100 , lauric: 0 , linoleic: 27 , linolenic: 0 , myristic: 0 , oleic: 66 , palmitic:  6 , ricinoleic:  0 , stearic: 0 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Argan Oil" , ins: 95 , iodine: 95 , lauric: 0 , linoleic: 34 , linolenic: 1 , myristic: 1 , oleic: 46 , palmitic:  14 , ricinoleic:  0 , stearic: 0 , sap: 0.191 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Avocado butter" , ins: 120 , iodine: 67 , lauric: 0 , linoleic: 6 , linolenic: 2 , myristic: 0 , oleic: 53 , palmitic:  21 , ricinoleic:  0 , stearic: 10 , sap: 0.187 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Avocado Oil" , ins: 99 , iodine: 86 , lauric: 0 , linoleic: 12 , linolenic: 0 , myristic: 0 , oleic: 58 , palmitic:  20 , ricinoleic:  0 , stearic: 2 , sap: 0.186 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Babassu Oil" , ins: 230 , iodine: 15 , lauric: 50 , linoleic: 0 , linolenic: 0 , myristic: 20 , oleic: 10 , palmitic:  11 , ricinoleic:  0 , stearic: 4 , sap: 0.245 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Baobab Oil" , ins: 125 , iodine: 75 , lauric: 0 , linoleic: 28 , linolenic: 2 , myristic: 1 , oleic: 37 , palmitic:  24 , ricinoleic:  0 , stearic: 4 , sap: 0.2 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Beeswax" , ins: 84 , iodine: 10 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.094 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Black Cumin Seed Oil, nigella sativa" , ins: 62 , iodine: 133 , lauric: 0 , linoleic: 60 , linolenic: 1 , myristic: 0 , oleic: 22 , palmitic:  13 , ricinoleic:  0 , stearic: 3 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Black Current Seed Oil" , ins: 12 , iodine: 178 , lauric: 0 , linoleic: 46 , linolenic: 29 , myristic: 0 , oleic: 13 , palmitic:  6 , ricinoleic:  0 , stearic: 2 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Borage Oil" , ins: 55 , iodine: 135 , lauric: 0 , linoleic: 43 , linolenic: 5 , myristic: 0 , oleic: 20 , palmitic:  10 , ricinoleic:  0 , stearic: 4 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Brazil Nut Oil" , ins: 90 , iodine: 100 , lauric: 0 , linoleic: 36 , linolenic: 0 , myristic: 0 , oleic: 39 , palmitic:  13 , ricinoleic:  0 , stearic: 11 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Broccoli Seed Oil, Brassica Oleracea" , ins: 67 , iodine: 105 , lauric: 0 , linoleic: 11 , linolenic: 9 , myristic: 0 , oleic: 14 , palmitic:  3 , ricinoleic:  0 , stearic: 1 , sap: 0.172 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 50 , caprylic:  0 , capric: 0 },
    { name:  "Buriti Oil" , ins: 153 , iodine: 70 , lauric: 0 , linoleic: 7 , linolenic: 1 , myristic: 0 , oleic: 71 , palmitic:  17 , ricinoleic:  0 , stearic: 2 , sap: 0.223 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Camelina Seed Oil" , ins: 44 , iodine: 144 , lauric: 0 , linoleic: 19 , linolenic: 45 , myristic: 0 , oleic: 24 , palmitic:  6 , ricinoleic:  0 , stearic: 2 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Camellia Oil, Tea Seed" , ins: 115 , iodine: 78 , lauric: 0 , linoleic: 8 , linolenic: 0 , myristic: 0 , oleic: 77 , palmitic:  9 , ricinoleic:  0 , stearic: 2 , sap: 0.193 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Candelilla Wax" , ins: 12 , iodine: 32 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.044 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Canola Oil" , ins: 56 , iodine: 110 , lauric: 0 , linoleic: 21 , linolenic: 9 , myristic: 0 , oleic: 61 , palmitic:  4 , ricinoleic:  0 , stearic: 2 , sap: 0.186 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Canola Oil, high oleic" , ins: 90 , iodine: 96 , lauric: 0 , linoleic: 12 , linolenic: 4 , myristic: 0 , oleic: 74 , palmitic:  4 , ricinoleic:  0 , stearic: 2 , sap: 0.186 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Carrot Seed Oil, cold pressed" , ins: 0 , iodine: 56 , lauric: 0 , linoleic: 13 , linolenic: 0 , myristic: 0 , oleic: 80 , palmitic:  4 , ricinoleic:  0 , stearic: 0 , sap: 0.144 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Castor Oil" , ins: 95 , iodine: 86 , lauric: 0 , linoleic: 4 , linolenic: 0 , myristic: 0 , oleic: 4 , palmitic:  0 , ricinoleic:  90 , stearic: 0 , sap: 0.18 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Cherry Kern1 Oil, p. avium" , ins: 62 , iodine: 128 , lauric: 0 , linoleic: 45 , linolenic: 11 , myristic: 0 , oleic: 31 , palmitic:  8 , ricinoleic:  0 , stearic: 3 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Cherry Kern2 Oil, p. cerasus" , ins: 74 , iodine: 118 , lauric: 0 , linoleic: 40 , linolenic: 0 , myristic: 0 , oleic: 50 , palmitic:  6 , ricinoleic:  0 , stearic: 3 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Chicken Fat" , ins: 130 , iodine: 69 , lauric: 0 , linoleic: 21 , linolenic: 0 , myristic: 1 , oleic: 38 , palmitic:  25 , ricinoleic:  0 , stearic: 7 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Cocoa Butter" , ins: 157 , iodine: 37 , lauric: 0 , linoleic: 3 , linolenic: 0 , myristic: 0 , oleic: 35 , palmitic:  28 , ricinoleic:  0 , stearic: 33 , sap: 0.194 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Coconut Oil, 76 deg" , ins: 258 , iodine: 10 , lauric: 48 , linoleic: 2 , linolenic: 0 , myristic: 19 , oleic: 8 , palmitic:  9 , ricinoleic:  0 , stearic: 3 , sap: 0.257 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Coconut Oil, 92 deg" , ins: 258 , iodine: 3 , lauric: 48 , linoleic: 2 , linolenic: 0 , myristic: 19 , oleic: 8 , palmitic:  9 , ricinoleic:  0 , stearic: 3 , sap: 0.257 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Coconut Oil, fractionated" , ins: 324 , iodine: 1 , lauric: 2 , linoleic: 0 , linolenic: 0 , myristic: 1 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.325 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  54 , capric: 43 },
    { name:  "Coffee Bean Oil, green" , ins: 100 , iodine: 85 , lauric: 0 , linoleic: 39 , linolenic: 2 , myristic: 0 , oleic: 9 , palmitic:  38 , ricinoleic:  0 , stearic: 8 , sap: 0.185 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Coffee Bean Oil, roasted" , ins: 93 , iodine: 87 , lauric: 0 , linoleic: 38 , linolenic: 2 , myristic: 0 , oleic: 8 , palmitic:  40 , ricinoleic:  0 , stearic: 0 , sap: 0.18 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Cohune Oil" , ins: 175 , iodine: 30 , lauric: 51 , linoleic: 3 , linolenic: 0 , myristic: 13 , oleic: 18 , palmitic:  8 , ricinoleic:  0 , stearic: 3 , sap: 0.205 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Corn Oil" , ins: 69 , iodine: 117 , lauric: 0 , linoleic: 51 , linolenic: 1 , myristic: 0 , oleic: 32 , palmitic:  12 , ricinoleic:  0 , stearic: 2 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Cottonseed Oil" , ins: 89 , iodine: 108 , lauric: 0 , linoleic: 52 , linolenic: 1 , myristic: 0 , oleic: 18 , palmitic:  13 , ricinoleic:  0 , stearic: 13 , sap: 0.194 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Cranberry Seed Oil" , ins: 40 , iodine: 150 , lauric: 0 , linoleic: 37 , linolenic: 32 , myristic: 0 , oleic: 23 , palmitic:  6 , ricinoleic:  0 , stearic: 2 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Crisco, new w/palm" , ins: 82 , iodine: 111 , lauric: 0 , linoleic: 40 , linolenic: 6 , myristic: 0 , oleic: 28 , palmitic:  20 , ricinoleic:  0 , stearic: 5 , sap: 0.193 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Crisco, old" , ins: 115 , iodine: 93 , lauric: 0 , linoleic: 52 , linolenic: 0 , myristic: 0 , oleic: 18 , palmitic:  13 , ricinoleic:  0 , stearic: 13 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Cupuacu Butter" , ins: 153 , iodine: 39 , lauric: 0 , linoleic: 2 , linolenic: 0 , myristic: 0 , oleic: 42 , palmitic:  8 , ricinoleic:  0 , stearic: 35 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Duck Fat, flesh and skin" , ins: 122 , iodine: 72 , lauric: 0 , linoleic: 13 , linolenic: 1 , myristic: 1 , oleic: 44 , palmitic:  26 , ricinoleic:  0 , stearic: 9 , sap: 0.194 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Emu Oil" , ins: 128 , iodine: 60 , lauric: 0 , linoleic: 8 , linolenic: 0 , myristic: 0 , oleic: 47 , palmitic:  23 , ricinoleic:  0 , stearic: 9 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Evening Primrose Oil" , ins: 30 , iodine: 160 , lauric: 0 , linoleic: 80 , linolenic: 9 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Flax Oil, linseed" , ins: -6 , iodine: 180 , lauric: 0 , linoleic: 13 , linolenic: 50 , myristic: 0 , oleic: 27 , palmitic:  6 , ricinoleic:  0 , stearic: 3 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Ghee, any bovine" , ins: 191 , iodine: 30 , lauric: 4 , linoleic: 2 , linolenic: 1 , myristic: 11 , oleic: 19 , palmitic:  28 , ricinoleic:  0 , stearic: 12 , sap: 0.227 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Goose Fat" , ins: 130 , iodine: 65 , lauric: 0 , linoleic: 10 , linolenic: 0 , myristic: 0 , oleic: 54 , palmitic:  21 , ricinoleic:  0 , stearic: 6 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Grapeseed Oil" , ins: 66 , iodine: 131 , lauric: 0 , linoleic: 68 , linolenic: 0 , myristic: 0 , oleic: 20 , palmitic:  8 , ricinoleic:  0 , stearic: 4 , sap: 0.181 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Hazelnut Oil" , ins: 94 , iodine: 97 , lauric: 0 , linoleic: 10 , linolenic: 0 , myristic: 0 , oleic: 75 , palmitic:  5 , ricinoleic:  0 , stearic: 3 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Hemp Oil" , ins: 39 , iodine: 165 , lauric: 0 , linoleic: 57 , linolenic: 21 , myristic: 0 , oleic: 12 , palmitic:  6 , ricinoleic:  0 , stearic: 2 , sap: 0.193 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Horse Oil" , ins: 117 , iodine: 79 , lauric: 0 , linoleic: 20 , linolenic: 19 , myristic: 3 , oleic: 10 , palmitic:  26 , ricinoleic:  0 , stearic: 5 , sap: 0.196 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Illipe Butter" , ins: 152 , iodine: 33 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 35 , palmitic:  17 , ricinoleic:  0 , stearic: 45 , sap: 0.185 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Japan Wax" , ins: 204 , iodine: 11 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 1 , oleic: 4 , palmitic:  80 , ricinoleic:  0 , stearic: 7 , sap: 0.215 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Jatropha Oil, soapnut seed oil" , ins: 91 , iodine: 102 , lauric: 0 , linoleic: 34 , linolenic: 0 , myristic: 0 , oleic: 44 , palmitic:  9 , ricinoleic:  0 , stearic: 7 , sap: 0.193 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Jojoba Oil (a Liquid Wax Ester)" , ins: 11 , iodine: 83 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 12 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.092 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Karanja Oil" , ins: 98 , iodine: 85 , lauric: 0 , linoleic: 15 , linolenic: 0 , myristic: 0 , oleic: 58 , palmitic:  6 , ricinoleic:  0 , stearic: 6 , sap: 0.183 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Kokum Butter" , ins: 155 , iodine: 35 , lauric: 0 , linoleic: 1 , linolenic: 0 , myristic: 0 , oleic: 36 , palmitic:  4 , ricinoleic:  0 , stearic: 56 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Kpangnan Butter" , ins: 149 , iodine: 42 , lauric: 0 , linoleic: 1 , linolenic: 0 , myristic: 0 , oleic: 49 , palmitic:  6 , ricinoleic:  0 , stearic: 44 , sap: 0.191 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Kukui nut Oil" , ins: 24 , iodine: 168 , lauric: 0 , linoleic: 42 , linolenic: 29 , myristic: 0 , oleic: 20 , palmitic:  6 , ricinoleic:  0 , stearic: 2 , sap: 0.189 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Lanolin liquid Wax" , ins: 83 , iodine: 27 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.106 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Lard, Pig Tallow (Manteca)" , ins: 139 , iodine: 57 , lauric: 0 , linoleic: 6 , linolenic: 0 , myristic: 1 , oleic: 46 , palmitic:  28 , ricinoleic:  0 , stearic: 13 , sap: 0.198 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Laurel Fruit Oil" , ins: 124 , iodine: 74 , lauric: 25 , linoleic: 26 , linolenic: 1 , myristic: 1 , oleic: 31 , palmitic:  15 , ricinoleic:  0 , stearic: 1 , sap: 0.198 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Lauric Acid" , ins: 280 , iodine: 0 , lauric: 99 , linoleic: 0 , linolenic: 0 , myristic: 1 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.28 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Linseed Oil, flax" , ins: -6 , iodine: 180 , lauric: 0 , linoleic: 13 , linolenic: 50 , myristic: 0 , oleic: 27 , palmitic:  6 , ricinoleic:  0 , stearic: 3 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Loofa Seed Oil, Luffa cylinderica" , ins: 79 , iodine: 108 , lauric: 0 , linoleic: 47 , linolenic: 0 , myristic: 0 , oleic: 30 , palmitic:  9 , ricinoleic:  0 , stearic: 18 , sap: 0.187 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Macadamia Nut Butter" , ins: 118 , iodine: 70 , lauric: 0 , linoleic: 3 , linolenic: 1 , myristic: 1 , oleic: 56 , palmitic:  6 , ricinoleic:  0 , stearic: 12 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Macadamia Nut Oil" , ins: 119 , iodine: 76 , lauric: 0 , linoleic: 2 , linolenic: 0 , myristic: 0 , oleic: 59 , palmitic:  9 , ricinoleic:  0 , stearic: 5 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Mafura Butter, Trichilia emetica " , ins: 132 , iodine: 66 , lauric: 0 , linoleic: 11 , linolenic: 1 , myristic: 1 , oleic: 49 , palmitic:  37 , ricinoleic:  0 , stearic: 3 , sap: 0.198 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Mango Seed Butter" , ins: 146 , iodine: 45 , lauric: 0 , linoleic: 3 , linolenic: 0 , myristic: 0 , oleic: 45 , palmitic:  7 , ricinoleic:  0 , stearic: 42 , sap: 0.191 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Mango Seed Oil" , ins: 130 , iodine: 60 , lauric: 0 , linoleic: 8 , linolenic: 1 , myristic: 0 , oleic: 52 , palmitic:  8 , ricinoleic:  0 , stearic: 27 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Marula Oil" , ins: 119 , iodine: 73 , lauric: 0 , linoleic: 4 , linolenic: 0 , myristic: 0 , oleic: 75 , palmitic:  11 , ricinoleic:  0 , stearic: 7 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Meadowfoam Oil" , ins: 77 , iodine: 92 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.169 , eicosenoic: 61 , docosenoid: 16 , docosadienoic: 18 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Milk Fat, any bovine" , ins: 191 , iodine: 30 , lauric: 4 , linoleic: 2 , linolenic: 1 , myristic: 11 , oleic: 19 , palmitic:  28 , ricinoleic:  0 , stearic: 12 , sap: 0.227 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Milk Thistle Oil" , ins: 81 , iodine: 115 , lauric: 0 , linoleic: 64 , linolenic: 0 , myristic: 0 , oleic: 26 , palmitic:  7 , ricinoleic:  0 , stearic: 2 , sap: 0.196 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Mink Oil" , ins: 141 , iodine: 55 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.196 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Monoi de Tahiti  Oil" , ins: 246 , iodine: 9 , lauric: 44 , linoleic: 2 , linolenic: 0 , myristic: 16 , oleic: 0 , palmitic:  10 , ricinoleic:  0 , stearic: 3 , sap: 0.255 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Moringa Oil" , ins: 124 , iodine: 68 , lauric: 0 , linoleic: 2 , linolenic: 0 , myristic: 0 , oleic: 71 , palmitic:  7 , ricinoleic:  0 , stearic: 7 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Mowrah Butter" , ins: 132 , iodine: 62 , lauric: 0 , linoleic: 15 , linolenic: 0 , myristic: 0 , oleic: 36 , palmitic:  24 , ricinoleic:  0 , stearic: 22 , sap: 0.194 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Murumuru Butter" , ins: 250 , iodine: 25 , lauric: 47 , linoleic: 3 , linolenic: 0 , myristic: 26 , oleic: 15 , palmitic:  6 , ricinoleic:  0 , stearic: 3 , sap: 0.275 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Mustard Oil, kachi ghani" , ins: 72 , iodine: 101 , lauric: 0 , linoleic: 14 , linolenic: 9 , myristic: 0 , oleic: 18 , palmitic:  2 , ricinoleic:  0 , stearic: 2 , sap: 0.173 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Myristic Acid" , ins: 246 , iodine: 1 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 99 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.247 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Neatsfoot Oil" , ins: 90 , iodine: 90 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.18 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Neem Seed Oil" , ins: 121 , iodine: 72 , lauric: 0 , linoleic: 12 , linolenic: 0 , myristic: 2 , oleic: 46 , palmitic:  21 , ricinoleic:  0 , stearic: 16 , sap: 0.193 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Nutmeg Butter" , ins: 116 , iodine: 46 , lauric: 3 , linoleic: 0 , linolenic: 0 , myristic: 83 , oleic: 5 , palmitic:  4 , ricinoleic:  0 , stearic: 0 , sap: 0.1624 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Oat Oil" , ins: 86 , iodine: 104 , lauric: 0 , linoleic: 39 , linolenic: 0 , myristic: 0 , oleic: 40 , palmitic:  15 , ricinoleic:  0 , stearic: 2 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Oleic Acid" , ins: 110 , iodine: 92 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 99 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.202 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Olive Oil" , ins: 105 , iodine: 85 , lauric: 0 , linoleic: 12 , linolenic: 1 , myristic: 0 , oleic: 69 , palmitic:  14 , ricinoleic:  0 , stearic: 3 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Olive Oil  pomace" , ins: 104 , iodine: 84 , lauric: 0 , linoleic: 12 , linolenic: 2 , myristic: 0 , oleic: 69 , palmitic:  14 , ricinoleic:  0 , stearic: 3 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Ostrich Oil" , ins: 128 , iodine: 97 , lauric: 3 , linoleic: 17 , linolenic: 3 , myristic: 1 , oleic: 37 , palmitic:  26 , ricinoleic:  0 , stearic: 6 , sap: 0.1946 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Palm Kernel Oil" , ins: 227 , iodine: 20 , lauric: 49 , linoleic: 3 , linolenic: 0 , myristic: 16 , oleic: 15 , palmitic:  8 , ricinoleic:  0 , stearic: 2 , sap: 0.247 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Palm Kernel Oil Flakes, hydrogenated" , ins: 227 , iodine: 20 , lauric: 49 , linoleic: 0 , linolenic: 0 , myristic: 17 , oleic: 4 , palmitic:  8 , ricinoleic:  0 , stearic: 16 , sap: 0.247 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Palm Oil" , ins: 145 , iodine: 53 , lauric: 0 , linoleic: 10 , linolenic: 0 , myristic: 1 , oleic: 39 , palmitic:  44 , ricinoleic:  0 , stearic: 5 , sap: 0.199 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Palm Stearin" , ins: 151 , iodine: 48 , lauric: 0 , linoleic: 7 , linolenic: 0 , myristic: 2 , oleic: 26 , palmitic:  60 , ricinoleic:  0 , stearic: 5 , sap: 0.199 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Palmitic Acid" , ins: 213 , iodine: 2 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  98 , ricinoleic:  0 , stearic: 0 , sap: 0.215 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Palmolein" , ins: 142 , iodine: 58 , lauric: 0 , linoleic: 11 , linolenic: 0 , myristic: 1 , oleic: 43 , palmitic:  40 , ricinoleic:  0 , stearic: 5 , sap: 0.2 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Papaya seed oil, Carica papaya" , ins: 91 , iodine: 67 , lauric: 0 , linoleic: 3 , linolenic: 0 , myristic: 0 , oleic: 76 , palmitic:  13 , ricinoleic:  0 , stearic: 5 , sap: 0.158 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Passion Fruit Seed Oil" , ins: 47 , iodine: 136 , lauric: 0 , linoleic: 70 , linolenic: 1 , myristic: 0 , oleic: 15 , palmitic:  10 , ricinoleic:  0 , stearic: 3 , sap: 0.183 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Pataua (Patawa) Oil" , ins: 123 , iodine: 77 , lauric: 0 , linoleic: 3 , linolenic: 1 , myristic: 0 , oleic: 78 , palmitic:  13 , ricinoleic:  0 , stearic: 4 , sap: 0.2 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Peach Kernel Oil" , ins: 87 , iodine: 108 , lauric: 0 , linoleic: 25 , linolenic: 1 , myristic: 0 , oleic: 65 , palmitic:  6 , ricinoleic:  0 , stearic: 2 , sap: 0.191 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Peanut Oil" , ins: 99 , iodine: 92 , lauric: 0 , linoleic: 26 , linolenic: 0 , myristic: 0 , oleic: 56 , palmitic:  8 , ricinoleic:  0 , stearic: 3 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Pecan Oil" , ins: 77 , iodine: 113 , lauric: 0 , linoleic: 39 , linolenic: 2 , myristic: 0 , oleic: 50 , palmitic:  7 , ricinoleic:  0 , stearic: 2 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Perilla Seed Oil" , ins: -6 , iodine: 196 , lauric: 0 , linoleic: 16 , linolenic: 56 , myristic: 0 , oleic: 15 , palmitic:  6 , ricinoleic:  0 , stearic: 2 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Pine Tar, lye calc only no FA" , ins: 0 , iodine: 0 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 0 , sap: 0.06 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Pistachio Oil" , ins: 92 , iodine: 95 , lauric: 0 , linoleic: 25 , linolenic: 0 , myristic: 0 , oleic: 63 , palmitic:  11 , ricinoleic:  0 , stearic: 1 , sap: 0.186 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Plum Kernel Oil" , ins: 96 , iodine: 98 , lauric: 0 , linoleic: 23 , linolenic: 0 , myristic: 0 , oleic: 68 , palmitic:  3 , ricinoleic:  0 , stearic: 0 , sap: 0.194 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Pomegranate Seed Oil" , ins: 168 , iodine: 22 , lauric: 0 , linoleic: 7 , linolenic: 78 , myristic: 0 , oleic: 7 , palmitic:  3 , ricinoleic:  0 , stearic: 3 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Poppy Seed Oil" , ins: 54 , iodine: 140 , lauric: 0 , linoleic: 69 , linolenic: 2 , myristic: 0 , oleic: 17 , palmitic:  10 , ricinoleic:  0 , stearic: 2 , sap: 0.194 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Pracaxi (Pracachy) Seed Oil - hair conditioner" , ins: 107 , iodine: 68 , lauric: 1 , linoleic: 2 , linolenic: 2 , myristic: 1 , oleic: 44 , palmitic:  2 , ricinoleic:  0 , stearic: 2 , sap: 0.175 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Pumpkin Seed Oil virgin" , ins: 67 , iodine: 128 , lauric: 0 , linoleic: 50 , linolenic: 0 , myristic: 0 , oleic: 33 , palmitic:  11 , ricinoleic:  0 , stearic: 8 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Rabbit Fat" , ins: 116 , iodine: 85 , lauric: 0 , linoleic: 20 , linolenic: 5 , myristic: 3 , oleic: 30 , palmitic:  30 , ricinoleic:  0 , stearic: 6 , sap: 0.201 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Rapeseed Oil, unrefined canola" , ins: 69 , iodine: 106 , lauric: 0 , linoleic: 13 , linolenic: 9 , myristic: 0 , oleic: 17 , palmitic:  4 , ricinoleic:  0 , stearic: 1 , sap: 0.175 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Raspberry Seed Oil" , ins: 24 , iodine: 163 , lauric: 0 , linoleic: 55 , linolenic: 26 , myristic: 0 , oleic: 13 , palmitic:  3 , ricinoleic:  0 , stearic: 0 , sap: 0.187 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Red Palm Butter" , ins: 145 , iodine: 53 , lauric: 0 , linoleic: 10 , linolenic: 0 , myristic: 1 , oleic: 39 , palmitic:  44 , ricinoleic:  0 , stearic: 5 , sap: 0.199 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Rice Bran Oil, refined" , ins: 87 , iodine: 100 , lauric: 0 , linoleic: 34 , linolenic: 2 , myristic: 1 , oleic: 38 , palmitic:  22 , ricinoleic:  0 , stearic: 3 , sap: 0.187 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Rosehip Oil" , ins: 10 , iodine: 188 , lauric: 0 , linoleic: 46 , linolenic: 31 , myristic: 0 , oleic: 12 , palmitic:  4 , ricinoleic:  0 , stearic: 2 , sap: 0.187 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Sacha Inchi, Plukenetia volubilis" , ins: 47 , iodine: 141 , lauric: 0 , linoleic: 35 , linolenic: 48 , myristic: 0 , oleic: 10 , palmitic:  4 , ricinoleic:  0 , stearic: 3 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Safflower Oil" , ins: 47 , iodine: 145 , lauric: 0 , linoleic: 75 , linolenic: 0 , myristic: 0 , oleic: 15 , palmitic:  7 , ricinoleic:  0 , stearic: 0 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Safflower Oil, high oleic" , ins: 97 , iodine: 93 , lauric: 0 , linoleic: 15 , linolenic: 0 , myristic: 0 , oleic: 77 , palmitic:  5 , ricinoleic:  0 , stearic: 2 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Sal Butter" , ins: 146 , iodine: 39 , lauric: 0 , linoleic: 2 , linolenic: 0 , myristic: 0 , oleic: 40 , palmitic:  6 , ricinoleic:  0 , stearic: 44 , sap: 0.185 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Salmon Oil" , ins: 16 , iodine: 169 , lauric: 0 , linoleic: 2 , linolenic: 1 , myristic: 5 , oleic: 23 , palmitic:  19 , ricinoleic:  0 , stearic: 3 , sap: 0.185 , eicosenoic: 20 , docosenoid: 0 , docosadienoic: 16 , erucic: 7 , caprylic:  0 , capric: 0 },
    { name:  "Saw Palmetto Extract" , ins: 185 , iodine: 45 , lauric: 29 , linoleic: 4 , linolenic: 1 , myristic: 11 , oleic: 35 , palmitic:  8 , ricinoleic:  0 , stearic: 2 , sap: 0.23 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Saw Palmetto Oil" , ins: 176 , iodine: 44 , lauric: 29 , linoleic: 4 , linolenic: 1 , myristic: 13 , oleic: 31 , palmitic:  9 , ricinoleic:  0 , stearic: 2 , sap: 0.22 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Sea Buckthorn Oil, seed" , ins: 30 , iodine: 165 , lauric: 0 , linoleic: 36 , linolenic: 38 , myristic: 0 , oleic: 14 , palmitic:  7 , ricinoleic:  0 , stearic: 3 , sap: 0.195 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Sea Buckthorn Oil, seed and berry" , ins: 97 , iodine: 86 , lauric: 0 , linoleic: 10 , linolenic: 0 , myristic: 0 , oleic: 28 , palmitic:  30 , ricinoleic:  0 , stearic: 1 , sap: 0.183 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Sesame Oil" , ins: 81 , iodine: 110 , lauric: 0 , linoleic: 43 , linolenic: 0 , myristic: 0 , oleic: 40 , palmitic:  10 , ricinoleic:  0 , stearic: 5 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Shea Butter" , ins: 116 , iodine: 59 , lauric: 0 , linoleic: 6 , linolenic: 0 , myristic: 0 , oleic: 48 , palmitic:  5 , ricinoleic:  0 , stearic: 40 , sap: 0.179 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Shea Oil, fractionated" , ins: 102 , iodine: 83 , lauric: 0 , linoleic: 11 , linolenic: 0 , myristic: 0 , oleic: 73 , palmitic:  6 , ricinoleic:  0 , stearic: 10 , sap: 0.185 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "SoapQuick, conventional" , ins: 153 , iodine: 59 , lauric: 13 , linoleic: 8 , linolenic: 1 , myristic: 6 , oleic: 42 , palmitic:  17 , ricinoleic:  5 , stearic: 3 , sap: 0.212 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "SoapQuick, organic" , ins: 156 , iodine: 56 , lauric: 13 , linoleic: 10 , linolenic: 0 , myristic: 5 , oleic: 45 , palmitic:  20 , ricinoleic:  0 , stearic: 3 , sap: 0.213 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Soybean Oil" , ins: 61 , iodine: 131 , lauric: 0 , linoleic: 50 , linolenic: 8 , myristic: 0 , oleic: 24 , palmitic:  11 , ricinoleic:  0 , stearic: 5 , sap: 0.191 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Soybean, 27.5% hydrogenated" , ins: 113 , iodine: 78 , lauric: 0 , linoleic: 7 , linolenic: 1 , myristic: 0 , oleic: 41 , palmitic:  9 , ricinoleic:  0 , stearic: 15 , sap: 0.191 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Soybean, fully hydrogenated (soy wax)" , ins: 191 , iodine: 1 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  11 , ricinoleic:  0 , stearic: 87 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Stearic Acid" , ins: 196 , iodine: 2 , lauric: 0 , linoleic: 0 , linolenic: 0 , myristic: 0 , oleic: 0 , palmitic:  0 , ricinoleic:  0 , stearic: 99 , sap: 0.198 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Sunflower Oil" , ins: 63 , iodine: 133 , lauric: 0 , linoleic: 70 , linolenic: 1 , myristic: 0 , oleic: 16 , palmitic:  7 , ricinoleic:  0 , stearic: 4 , sap: 0.189 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Sunflower Oil, high oleic" , ins: 106 , iodine: 83 , lauric: 0 , linoleic: 4 , linolenic: 1 , myristic: 0 , oleic: 83 , palmitic:  3 , ricinoleic:  0 , stearic: 4 , sap: 0.189 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Tallow Bear" , ins: 100 , iodine: 92 , lauric: 0 , linoleic: 9 , linolenic: 0 , myristic: 2 , oleic: 70 , palmitic:  7 , ricinoleic:  0 , stearic: 3 , sap: 0.1946 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Tallow Beef" , ins: 147 , iodine: 45 , lauric: 2 , linoleic: 3 , linolenic: 1 , myristic: 6 , oleic: 36 , palmitic:  28 , ricinoleic:  0 , stearic: 22 , sap: 0.2 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Tallow Deer" , ins: 166 , iodine: 31 , lauric: 0 , linoleic: 15 , linolenic: 3 , myristic: 1 , oleic: 30 , palmitic:  20 , ricinoleic:  0 , stearic: 24 , sap: 0.193 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Tallow Goat" , ins: 152 , iodine: 40 , lauric: 5 , linoleic: 2 , linolenic: 0 , myristic: 11 , oleic: 29 , palmitic:  23 , ricinoleic:  0 , stearic: 30 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Tallow Sheep" , ins: 156 , iodine: 54 , lauric: 4 , linoleic: 5 , linolenic: 0 , myristic: 10 , oleic: 26 , palmitic:  24 , ricinoleic:  0 , stearic: 13 , sap: 0.194 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Tamanu Oil, kamani" , ins: 82 , iodine: 111 , lauric: 0 , linoleic: 38 , linolenic: 1 , myristic: 0 , oleic: 34 , palmitic:  12 , ricinoleic:  0 , stearic: 13 , sap: 0.208 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Tucuma Seed Butter" , ins: 175 , iodine: 13 , lauric: 48 , linoleic: 0 , linolenic: 0 , myristic: 23 , oleic: 13 , palmitic:  6 , ricinoleic:  0 , stearic: 0 , sap: 0.238 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Ucuuba Butter" , ins: 167 , iodine: 38 , lauric: 0 , linoleic: 5 , linolenic: 0 , myristic: 0 , oleic: 44 , palmitic:  0 , ricinoleic:  0 , stearic: 31 , sap: 0.205 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Walmart GV Shortening, tallow, palm" , ins: 151 , iodine: 49 , lauric: 1 , linoleic: 6 , linolenic: 1 , myristic: 4 , oleic: 37 , palmitic:  35 , ricinoleic:  0 , stearic: 14 , sap: 0.198 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Walnut Oil" , ins: 45 , iodine: 145 , lauric: 0 , linoleic: 60 , linolenic: 0 , myristic: 0 , oleic: 18 , palmitic:  7 , ricinoleic:  0 , stearic: 2 , sap: 0.189 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Watermelon Seed Oil" , ins: 71 , iodine: 119 , lauric: 0 , linoleic: 60 , linolenic: 1 , myristic: 0 , oleic: 18 , palmitic:  11 , ricinoleic:  0 , stearic: 10 , sap: 0.19 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Wheat Germ Oil" , ins: 58 , iodine: 128 , lauric: 0 , linoleic: 58 , linolenic: 0 , myristic: 0 , oleic: 17 , palmitic:  17 , ricinoleic:  0 , stearic: 2 , sap: 0.183 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Yangu, cape chestnut" , ins: 97 , iodine: 95 , lauric: 0 , linoleic: 30 , linolenic: 1 , myristic: 0 , oleic: 45 , palmitic:  18 , ricinoleic:  0 , stearic: 5 , sap: 0.192 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 },
    { name:  "Zapote seed oil, (Aceite de Sapuyul or Mamey)" , ins: 116 , iodine: 72 , lauric: 0 , linoleic: 13 , linolenic: 0 , myristic: 0 , oleic: 52 , palmitic:  9 , ricinoleic:  0 , stearic: 21 , sap: 0.188 , eicosenoic: 0 , docosenoid: 0 , docosadienoic: 0 , erucic: 0 , caprylic:  0 , capric: 0 }
];

function properties( oil ) {
    return {
        hardness: propertyValueForOil( oil, ['lauric', 'myristic', 'palmitic', 'stearic', 'caprylic', 'capric'] ),
        cleansing: propertyValueForOil( oil, ['lauric', 'myristic', 'caprylic', 'capric'] ),
        bubbly: propertyValueForOil( oil, ['lauric', 'myristic', 'ricinoleic', 'caprylic', 'capric'] ),
        stable: propertyValueForOil( oil, ['palmitic', 'stearic', 'ricinoleic'] ),
        condition: propertyValueForOil( oil, ['ricinoleic', 'oleic', 'linoleic', 'linolenic', 'eicosenoic', 'docosenoid', 'docosadienoic', 'erucic'] )
    }
}

function totalSaponifiable( oil ) {
    return propertyValueForOil( oil, _.keys( sapyOils ) );
}

function saturationBreakdowns() {
    return {
        saturated: _( sapyOils ).pick( filterByMatch( ':0' ) ).keys().value(),
        monoSaturated: _( sapyOils ).pick( filterByMatch( ':1' ) ).keys().value(),
        polySaturated: _( sapyOils ).pick( filterByMatch( ':2' ) ).keys().value()
    };
}

function filterByMatch( matcher ) {
    return function( oilType ) {
        return oilType.match( matcher );
    }
}

function propertyValueForOil( oil, fats ) {
    return _.reduce( fats, function( total, fat ) {
        return total + oil[fat];
    }, 0 );
}

function fatBreakdown( oil ) {
    var fats = _.keys( sapyOils );

    return _.transform( fats, function( result, fat ) {
        if ( oil[fat] ) {
            result[ fat ] = oil[fat];
        }
    }, {} );
}

function saturationBreakdown( oil ) {
    return _.transform( saturationBreakdowns(), function( result, fats, group ) {
        result[ group ] = propertyValueForOil( oil, fats );
    } );
}

function buildOil( oil, id ) {
    return {
        id: id,
        name: oil.name,
        iodine: oil.iodine,
        ins: oil.ins,
        sap: oil.sap,
        breakdown: fatBreakdown( oil ),
        properties: properties( oil ),
        saturation: saturationBreakdown( oil ),
        totalSaponifiable: totalSaponifiable( oil )
    }
}

_.each( oils, function( oil, index ) {
    console.log( JSON.stringify(buildOil( oil, index + 1 )), ',' )
} );