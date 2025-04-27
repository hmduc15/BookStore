import { string, number, array, record, object, size, optional, defaulted, assign, mask } from 'superstruct';

const SearchMatches = record(string(), size(array(number()), 2));

const BaseSchema = object({
  code: number(),
  name: string(),
  matches: optional(SearchMatches)
});

const WardSchema = BaseSchema;

const DistrictShema = assign(
  BaseSchema,
  object({
    wards: defaulted(array(WardSchema), [])
  })
);

const ProvinceSchema = assign(
  BaseSchema,
  object({
    districts: defaulted(array(DistrictShema), [])
  })
);

// Export các schema
export {
  SearchMatches,
  BaseSchema,
  WardSchema,
  DistrictShema,
  ProvinceSchema
};

// Export các types (trong JS sẽ không có kiểu mạnh như TypeScript)
// Đây chỉ là documentation để biết cấu trúc object
/**
 * @typedef {Object} Base
 * @property {number} code
 * @property {string} name
 * @property {Object.<string, [number, number]>} [matches]
 */

/**
 * @typedef {Base} Ward
 */

/**
 * @typedef {Base & { wards: Ward[] }} District
 */

/**
 * @typedef {Base & { districts: District[] }} Province
 */

export const Types = {
  /** @type {Base} */
  Base: null,
  /** @type {Ward} */
  Ward: null,
  /** @type {District} */
  District: null,
  /** @type {Province} */
  Province: null
};