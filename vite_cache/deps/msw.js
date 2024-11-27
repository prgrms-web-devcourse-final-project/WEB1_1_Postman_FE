import {
  DeferredPromise,
  RequestHandler,
  SetupApi,
  WebSocketHandler,
  cleanUrl,
  cookieStore,
  createRequestId,
  decorateResponse,
  devUtils,
  executeHandlers,
  getSearchParams,
  getTimestamp,
  handleRequest,
  invariant,
  isNodeProcess,
  isPath,
  kEmitter,
  matchRequestUrl,
  normalizeResponseInit,
  source_default,
  stringToHeaders,
  toPublicUrl
} from "./chunk-U5NCF324.js";
import {
  __publicField
} from "./chunk-BJNOTN5A.js";

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/internal/checkGlobals.mjs
function checkGlobals() {
  invariant(
    typeof URL !== "undefined",
    devUtils.formatMessage(
      `Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`
    )
  );
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/internal/isStringEqual.mjs
function isStringEqual(actual, expected) {
  return actual.toLowerCase() === expected.toLowerCase();
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/logging/getStatusCodeColor.mjs
var StatusCodeColor = ((StatusCodeColor2) => {
  StatusCodeColor2["Success"] = "#69AB32";
  StatusCodeColor2["Warning"] = "#F0BB4B";
  StatusCodeColor2["Danger"] = "#E95F5D";
  return StatusCodeColor2;
})(StatusCodeColor || {});
function getStatusCodeColor(status) {
  if (status < 300) {
    return "#69AB32";
  }
  if (status < 400) {
    return "#F0BB4B";
  }
  return "#E95F5D";
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/logging/serializeRequest.mjs
async function serializeRequest(request) {
  const requestClone = request.clone();
  const requestText = await requestClone.text();
  return {
    url: new URL(request.url),
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: requestText
  };
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/logging/serializeResponse.mjs
var { message } = source_default;
async function serializeResponse(response) {
  const responseClone = response.clone();
  const responseText = await responseClone.text();
  const responseStatus = responseClone.status || 200;
  const responseStatusText = responseClone.statusText || message[responseStatus] || "OK";
  return {
    status: responseStatus,
    statusText: responseStatusText,
    headers: Object.fromEntries(responseClone.headers.entries()),
    body: responseText
  };
}

// ../../AppData/Local/Yarn/Berry/cache/@bundled-es-modules-cookie-npm-2.0.1-fb001bd2b9-10c0.zip/node_modules/@bundled-es-modules/cookie/index-esm.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var __toString = Object.prototype.toString;
    var __hasOwnProperty = Object.prototype.hasOwnProperty;
    var cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    var cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    function parse(str, opt) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var len = str.length;
      if (len < 2) return obj;
      var dec = opt && opt.decode || decode;
      var index = 0;
      var eqIdx = 0;
      var endIdx = 0;
      do {
        eqIdx = str.indexOf("=", index);
        if (eqIdx === -1) break;
        endIdx = str.indexOf(";", index);
        if (endIdx === -1) {
          endIdx = len;
        } else if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var keyStartIdx = startIndex(str, index, eqIdx);
        var keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
        var key = str.slice(keyStartIdx, keyEndIdx);
        if (!__hasOwnProperty.call(obj, key)) {
          var valStartIdx = startIndex(str, eqIdx + 1, endIdx);
          var valEndIdx = endIndex(str, endIdx, valStartIdx);
          if (str.charCodeAt(valStartIdx) === 34 && str.charCodeAt(valEndIdx - 1) === 34) {
            valStartIdx++;
            valEndIdx--;
          }
          var val = str.slice(valStartIdx, valEndIdx);
          obj[key] = tryDecode(val, dec);
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function startIndex(str, index, max) {
      do {
        var code = str.charCodeAt(index);
        if (code !== 32 && code !== 9) return index;
      } while (++index < max);
      return max;
    }
    function endIndex(str, index, min) {
      while (index > min) {
        var code = str.charCodeAt(--index);
        if (code !== 32 && code !== 9) return index + 1;
      }
      return min;
    }
    function serialize(name, val, opt) {
      var enc = opt && opt.encode || encodeURIComponent;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!cookieNameRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (!opt) return str;
      if (null != opt.maxAge) {
        var maxAge = Math.floor(opt.maxAge);
        if (!isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + maxAge;
      }
      if (opt.domain) {
        if (!domainValueRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!pathValueRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});
var import_cookie = __toESM(require_cookie(), 1);
var source_default2 = import_cookie.default;

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/request/getRequestCookies.mjs
function parseCookies(input) {
  const parsedCookies = source_default2.parse(input);
  const cookies = {};
  for (const cookieName in parsedCookies) {
    if (typeof parsedCookies[cookieName] !== "undefined") {
      cookies[cookieName] = parsedCookies[cookieName];
    }
  }
  return cookies;
}
function getAllDocumentCookies() {
  return parseCookies(document.cookie);
}
function getDocumentCookies(request) {
  if (typeof document === "undefined" || typeof location === "undefined") {
    return {};
  }
  switch (request.credentials) {
    case "same-origin": {
      const requestUrl = new URL(request.url);
      return location.origin === requestUrl.origin ? getAllDocumentCookies() : {};
    }
    case "include": {
      return getAllDocumentCookies();
    }
    default: {
      return {};
    }
  }
}
function getAllRequestCookies(request) {
  const requestCookieHeader = request.headers.get("cookie");
  const cookiesFromHeaders = requestCookieHeader ? parseCookies(requestCookieHeader) : {};
  const cookiesFromDocument = getDocumentCookies(request);
  for (const name in cookiesFromDocument) {
    request.headers.append(
      "cookie",
      source_default2.serialize(name, cookiesFromDocument[name])
    );
  }
  const cookiesFromStore = cookieStore.getCookiesSync(request.url);
  const storedCookiesObject = Object.fromEntries(
    cookiesFromStore.map((cookie) => [cookie.key, cookie.value])
  );
  for (const cookie of cookiesFromStore) {
    request.headers.append("cookie", cookie.toString());
  }
  return {
    ...cookiesFromDocument,
    ...storedCookiesObject,
    ...cookiesFromHeaders
  };
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/handlers/HttpHandler.mjs
var HttpMethods = ((HttpMethods2) => {
  HttpMethods2["HEAD"] = "HEAD";
  HttpMethods2["GET"] = "GET";
  HttpMethods2["POST"] = "POST";
  HttpMethods2["PUT"] = "PUT";
  HttpMethods2["PATCH"] = "PATCH";
  HttpMethods2["OPTIONS"] = "OPTIONS";
  HttpMethods2["DELETE"] = "DELETE";
  return HttpMethods2;
})(HttpMethods || {});
var HttpHandler = class extends RequestHandler {
  constructor(method, path, resolver, options) {
    super({
      info: {
        header: `${method} ${path}`,
        path,
        method
      },
      resolver,
      options
    });
    this.checkRedundantQueryParameters();
  }
  checkRedundantQueryParameters() {
    const { method, path } = this.info;
    if (path instanceof RegExp) {
      return;
    }
    const url = cleanUrl(path);
    if (url === path) {
      return;
    }
    const searchParams = getSearchParams(path);
    const queryParams = [];
    searchParams.forEach((_, paramName) => {
      queryParams.push(paramName);
    });
    devUtils.warn(
      `Found a redundant usage of query parameters in the request handler URL for "${method} ${path}". Please match against a path instead and access query parameters using "new URL(request.url).searchParams" instead. Learn more: https://mswjs.io/docs/recipes/query-parameters`
    );
  }
  async parse(args) {
    var _a;
    const url = new URL(args.request.url);
    const match = matchRequestUrl(
      url,
      this.info.path,
      (_a = args.resolutionContext) == null ? void 0 : _a.baseUrl
    );
    const cookies = getAllRequestCookies(args.request);
    return {
      match,
      cookies
    };
  }
  predicate(args) {
    const hasMatchingMethod = this.matchMethod(args.request.method);
    const hasMatchingUrl = args.parsedResult.match.matches;
    return hasMatchingMethod && hasMatchingUrl;
  }
  matchMethod(actualMethod) {
    return this.info.method instanceof RegExp ? this.info.method.test(actualMethod) : isStringEqual(this.info.method, actualMethod);
  }
  extendResolverArgs(args) {
    var _a;
    return {
      params: ((_a = args.parsedResult.match) == null ? void 0 : _a.params) || {},
      cookies: args.parsedResult.cookies
    };
  }
  async log(args) {
    const publicUrl = toPublicUrl(args.request.url);
    const loggedRequest = await serializeRequest(args.request);
    const loggedResponse = await serializeResponse(args.response);
    const statusColor = getStatusCodeColor(loggedResponse.status);
    console.groupCollapsed(
      devUtils.formatMessage(
        `${getTimestamp()} ${args.request.method} ${publicUrl} (%c${loggedResponse.status} ${loggedResponse.statusText}%c)`
      ),
      `color:${statusColor}`,
      "color:inherit"
    );
    console.log("Request", loggedRequest);
    console.log("Handler:", this);
    console.log("Response", loggedResponse);
    console.groupEnd();
  }
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/http.mjs
function createHttpHandler(method) {
  return (path, resolver, options = {}) => {
    return new HttpHandler(method, path, resolver, options);
  };
}
var http = {
  all: createHttpHandler(/.+/),
  head: createHttpHandler(HttpMethods.HEAD),
  get: createHttpHandler(HttpMethods.GET),
  post: createHttpHandler(HttpMethods.POST),
  put: createHttpHandler(HttpMethods.PUT),
  delete: createHttpHandler(HttpMethods.DELETE),
  patch: createHttpHandler(HttpMethods.PATCH),
  options: createHttpHandler(HttpMethods.OPTIONS)
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/internal/jsonParse.mjs
function jsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return void 0;
  }
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/internal/parseMultipartData.mjs
function parseContentHeaders(headersString) {
  var _a, _b;
  const headers = stringToHeaders(headersString);
  const contentType = headers.get("content-type") || "text/plain";
  const disposition = headers.get("content-disposition");
  if (!disposition) {
    throw new Error('"Content-Disposition" header is required.');
  }
  const directives = disposition.split(";").reduce((acc, chunk) => {
    const [name2, ...rest] = chunk.trim().split("=");
    acc[name2] = rest.join("=");
    return acc;
  }, {});
  const name = (_a = directives.name) == null ? void 0 : _a.slice(1, -1);
  const filename = (_b = directives.filename) == null ? void 0 : _b.slice(1, -1);
  return {
    name,
    filename,
    contentType
  };
}
function parseMultipartData(data, headers) {
  const contentType = headers == null ? void 0 : headers.get("content-type");
  if (!contentType) {
    return void 0;
  }
  const [, ...directives] = contentType.split(/; */);
  const boundary = directives.filter((d) => d.startsWith("boundary=")).map((s) => s.replace(/^boundary=/, ""))[0];
  if (!boundary) {
    return void 0;
  }
  const boundaryRegExp = new RegExp(`--+${boundary}`);
  const fields = data.split(boundaryRegExp).filter((chunk) => chunk.startsWith("\r\n") && chunk.endsWith("\r\n")).map((chunk) => chunk.trimStart().replace(/\r\n$/, ""));
  if (!fields.length) {
    return void 0;
  }
  const parsedBody = {};
  try {
    for (const field of fields) {
      const [contentHeaders, ...rest] = field.split("\r\n\r\n");
      const contentBody = rest.join("\r\n\r\n");
      const { contentType: contentType2, filename, name } = parseContentHeaders(contentHeaders);
      const value = filename === void 0 ? contentBody : new File([contentBody], filename, { type: contentType2 });
      const parsedValue = parsedBody[name];
      if (parsedValue === void 0) {
        parsedBody[name] = value;
      } else if (Array.isArray(parsedValue)) {
        parsedBody[name] = [...parsedValue, value];
      } else {
        parsedBody[name] = [parsedValue, value];
      }
    }
    return parsedBody;
  } catch {
    return void 0;
  }
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/utils/internal/parseGraphQLRequest.mjs
function parseDocumentNode(node) {
  var _a;
  const operationDef = node.definitions.find((definition) => {
    return definition.kind === "OperationDefinition";
  });
  return {
    operationType: operationDef == null ? void 0 : operationDef.operation,
    operationName: (_a = operationDef == null ? void 0 : operationDef.name) == null ? void 0 : _a.value
  };
}
async function parseQuery(query) {
  const { parse } = await import("./graphql-PSJ4QITQ.js").catch((error) => {
    console.error('[MSW] Failed to parse a GraphQL query: cannot import the "graphql" module. Please make sure you install it if you wish to intercept GraphQL requests. See the original import error below.');
    throw error;
  });
  try {
    const ast = parse(query);
    return parseDocumentNode(ast);
  } catch (error) {
    return error;
  }
}
function extractMultipartVariables(variables, map, files) {
  const operations = { variables };
  for (const [key, pathArray] of Object.entries(map)) {
    if (!(key in files)) {
      throw new Error(`Given files do not have a key '${key}' .`);
    }
    for (const dotPath of pathArray) {
      const [lastPath, ...reversedPaths] = dotPath.split(".").reverse();
      const paths = reversedPaths.reverse();
      let target = operations;
      for (const path of paths) {
        if (!(path in target)) {
          throw new Error(`Property '${paths}' is not in operations.`);
        }
        target = target[path];
      }
      target[lastPath] = files[key];
    }
  }
  return operations.variables;
}
async function getGraphQLInput(request) {
  var _a;
  switch (request.method) {
    case "GET": {
      const url = new URL(request.url);
      const query = url.searchParams.get("query");
      const variables = url.searchParams.get("variables") || "";
      return {
        query,
        variables: jsonParse(variables)
      };
    }
    case "POST": {
      const requestClone = request.clone();
      if ((_a = request.headers.get("content-type")) == null ? void 0 : _a.includes("multipart/form-data")) {
        const responseJson = parseMultipartData(
          await requestClone.text(),
          request.headers
        );
        if (!responseJson) {
          return null;
        }
        const { operations, map, ...files } = responseJson;
        const parsedOperations = jsonParse(
          operations
        ) || {};
        if (!parsedOperations.query) {
          return null;
        }
        const parsedMap = jsonParse(map || "") || {};
        const variables = parsedOperations.variables ? extractMultipartVariables(
          parsedOperations.variables,
          parsedMap,
          files
        ) : {};
        return {
          query: parsedOperations.query,
          variables
        };
      }
      const requestJson = await requestClone.json().catch(() => null);
      if (requestJson == null ? void 0 : requestJson.query) {
        const { query, variables } = requestJson;
        return {
          query,
          variables
        };
      }
    }
    default:
      return null;
  }
}
async function parseGraphQLRequest(request) {
  const input = await getGraphQLInput(request);
  if (!input || !input.query) {
    return;
  }
  const { query, variables } = input;
  const parsedResult = await parseQuery(query);
  if (parsedResult instanceof Error) {
    const requestPublicUrl = toPublicUrl(request.url);
    throw new Error(
      devUtils.formatMessage(
        'Failed to intercept a GraphQL request to "%s %s": cannot parse query. See the error message from the parser below.\n\n%s',
        request.method,
        requestPublicUrl,
        parsedResult.message
      )
    );
  }
  return {
    query: input.query,
    operationType: parsedResult.operationType,
    operationName: parsedResult.operationName,
    variables
  };
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/handlers/GraphQLHandler.mjs
function isDocumentNode(value) {
  if (value == null) {
    return false;
  }
  return typeof value === "object" && "kind" in value && "definitions" in value;
}
var _GraphQLHandler = class _GraphQLHandler extends RequestHandler {
  constructor(operationType, operationName, endpoint, resolver, options) {
    let resolvedOperationName = operationName;
    if (isDocumentNode(operationName)) {
      const parsedNode = parseDocumentNode(operationName);
      if (parsedNode.operationType !== operationType) {
        throw new Error(
          `Failed to create a GraphQL handler: provided a DocumentNode with a mismatched operation type (expected "${operationType}", but got "${parsedNode.operationType}").`
        );
      }
      if (!parsedNode.operationName) {
        throw new Error(
          `Failed to create a GraphQL handler: provided a DocumentNode with no operation name.`
        );
      }
      resolvedOperationName = parsedNode.operationName;
    }
    const header = operationType === "all" ? `${operationType} (origin: ${endpoint.toString()})` : `${operationType} ${resolvedOperationName} (origin: ${endpoint.toString()})`;
    super({
      info: {
        header,
        operationType,
        operationName: resolvedOperationName
      },
      resolver,
      options
    });
    __publicField(this, "endpoint");
    this.endpoint = endpoint;
  }
  /**
   * Parses the request body, once per request, cached across all
   * GraphQL handlers. This is done to avoid multiple parsing of the
   * request body, which each requires a clone of the request.
   */
  async parseGraphQLRequestOrGetFromCache(request) {
    if (!_GraphQLHandler.parsedRequestCache.has(request)) {
      _GraphQLHandler.parsedRequestCache.set(
        request,
        await parseGraphQLRequest(request).catch((error) => {
          console.error(error);
          return void 0;
        })
      );
    }
    return _GraphQLHandler.parsedRequestCache.get(request);
  }
  async parse(args) {
    const match = matchRequestUrl(new URL(args.request.url), this.endpoint);
    const cookies = getAllRequestCookies(args.request);
    if (!match.matches) {
      return { match, cookies };
    }
    const parsedResult = await this.parseGraphQLRequestOrGetFromCache(
      args.request
    );
    if (typeof parsedResult === "undefined") {
      return { match, cookies };
    }
    return {
      match,
      cookies,
      query: parsedResult.query,
      operationType: parsedResult.operationType,
      operationName: parsedResult.operationName,
      variables: parsedResult.variables
    };
  }
  predicate(args) {
    if (args.parsedResult.operationType === void 0) {
      return false;
    }
    if (!args.parsedResult.operationName && this.info.operationType !== "all") {
      const publicUrl = toPublicUrl(args.request.url);
      devUtils.warn(`Failed to intercept a GraphQL request at "${args.request.method} ${publicUrl}": anonymous GraphQL operations are not supported.

Consider naming this operation or using "graphql.operation()" request handler to intercept GraphQL requests regardless of their operation name/type. Read more: https://mswjs.io/docs/api/graphql/#graphqloperationresolver`);
      return false;
    }
    const hasMatchingOperationType = this.info.operationType === "all" || args.parsedResult.operationType === this.info.operationType;
    const hasMatchingOperationName = this.info.operationName instanceof RegExp ? this.info.operationName.test(args.parsedResult.operationName || "") : args.parsedResult.operationName === this.info.operationName;
    return args.parsedResult.match.matches && hasMatchingOperationType && hasMatchingOperationName;
  }
  extendResolverArgs(args) {
    return {
      query: args.parsedResult.query || "",
      operationName: args.parsedResult.operationName || "",
      variables: args.parsedResult.variables || {},
      cookies: args.parsedResult.cookies
    };
  }
  async log(args) {
    const loggedRequest = await serializeRequest(args.request);
    const loggedResponse = await serializeResponse(args.response);
    const statusColor = getStatusCodeColor(loggedResponse.status);
    const requestInfo = args.parsedResult.operationName ? `${args.parsedResult.operationType} ${args.parsedResult.operationName}` : `anonymous ${args.parsedResult.operationType}`;
    console.groupCollapsed(
      devUtils.formatMessage(
        `${getTimestamp()} ${requestInfo} (%c${loggedResponse.status} ${loggedResponse.statusText}%c)`
      ),
      `color:${statusColor}`,
      "color:inherit"
    );
    console.log("Request:", loggedRequest);
    console.log("Handler:", this);
    console.log("Response:", loggedResponse);
    console.groupEnd();
  }
};
__publicField(_GraphQLHandler, "parsedRequestCache", /* @__PURE__ */ new WeakMap());
var GraphQLHandler = _GraphQLHandler;

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/graphql.mjs
function createScopedGraphQLHandler(operationType, url) {
  return (operationName, resolver, options = {}) => {
    return new GraphQLHandler(
      operationType,
      operationName,
      url,
      resolver,
      options
    );
  };
}
function createGraphQLOperationHandler(url) {
  return (resolver) => {
    return new GraphQLHandler("all", new RegExp(".*"), url, resolver);
  };
}
var standardGraphQLHandlers = {
  /**
   * Intercepts a GraphQL query by a given name.
   *
   * @example
   * graphql.query('GetUser', () => {
   *   return HttpResponse.json({ data: { user: { name: 'John' } } })
   * })
   *
   * @see {@link https://mswjs.io/docs/api/graphql#graphqlqueryqueryname-resolver `graphql.query()` API reference}
   */
  query: createScopedGraphQLHandler("query", "*"),
  /**
   * Intercepts a GraphQL mutation by its name.
   *
   * @example
   * graphql.mutation('SavePost', () => {
   *   return HttpResponse.json({ data: { post: { id: 'abc-123 } } })
   * })
   *
   * @see {@link https://mswjs.io/docs/api/graphql#graphqlmutationmutationname-resolver `graphql.query()` API reference}
   *
   */
  mutation: createScopedGraphQLHandler("mutation", "*"),
  /**
   * Intercepts any GraphQL operation, regardless of its type or name.
   *
   * @example
   * graphql.operation(() => {
   *   return HttpResponse.json({ data: { name: 'John' } })
   * })
   *
   * @see {@link https://mswjs.io/docs/api/graphql#graphloperationresolver `graphql.operation()` API reference}
   */
  operation: createGraphQLOperationHandler("*")
};
function createGraphQLLink(url) {
  return {
    operation: createGraphQLOperationHandler(url),
    query: createScopedGraphQLHandler("query", url),
    mutation: createScopedGraphQLHandler("mutation", url)
  };
}
var graphql = {
  ...standardGraphQLHandlers,
  /**
   * Intercepts GraphQL operations scoped by the given URL.
   *
   * @example
   * const github = graphql.link('https://api.github.com/graphql')
   * github.query('GetRepo', resolver)
   *
   * @see {@link https://mswjs.io/docs/api/graphql#graphqllinkurl `graphql.link()` API reference}
   */
  link: createGraphQLLink
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/ws/WebSocketMemoryClientStore.mjs
var WebSocketMemoryClientStore = class {
  constructor() {
    __publicField(this, "store");
    this.store = /* @__PURE__ */ new Map();
  }
  async add(client) {
    this.store.set(client.id, { id: client.id, url: client.url.href });
  }
  getAll() {
    return Promise.resolve(Array.from(this.store.values()));
  }
  async deleteMany(clientIds) {
    for (const clientId of clientIds) {
      this.store.delete(clientId);
    }
  }
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/ws/WebSocketIndexedDBClientStore.mjs
var DB_NAME = "msw-websocket-clients";
var DB_STORE_NAME = "clients";
var WebSocketIndexedDBClientStore = class {
  constructor() {
    __publicField(this, "db");
    this.db = this.createDatabase();
  }
  async add(client) {
    const promise = new DeferredPromise();
    const store = await this.getStore();
    const request = store.put({
      id: client.id,
      url: client.url.href
    });
    request.onsuccess = () => {
      promise.resolve();
    };
    request.onerror = () => {
      console.error(request.error);
      promise.reject(
        new Error(
          `Failed to add WebSocket client "${client.id}". There is likely an additional output above.`
        )
      );
    };
    return promise;
  }
  async getAll() {
    const promise = new DeferredPromise();
    const store = await this.getStore();
    const request = store.getAll();
    request.onsuccess = () => {
      promise.resolve(request.result);
    };
    request.onerror = () => {
      console.log(request.error);
      promise.reject(
        new Error(
          `Failed to get all WebSocket clients. There is likely an additional output above.`
        )
      );
    };
    return promise;
  }
  async deleteMany(clientIds) {
    const promise = new DeferredPromise();
    const store = await this.getStore();
    for (const clientId of clientIds) {
      store.delete(clientId);
    }
    store.transaction.oncomplete = () => {
      promise.resolve();
    };
    store.transaction.onerror = () => {
      console.error(store.transaction.error);
      promise.reject(
        new Error(
          `Failed to delete WebSocket clients [${clientIds.join(", ")}]. There is likely an additional output above.`
        )
      );
    };
    return promise;
  }
  async createDatabase() {
    const promise = new DeferredPromise();
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = ({ currentTarget }) => {
      const db = Reflect.get(currentTarget, "result");
      if (db.objectStoreNames.contains(DB_STORE_NAME)) {
        return promise.resolve(db);
      }
    };
    request.onupgradeneeded = async ({ currentTarget }) => {
      const db = Reflect.get(currentTarget, "result");
      if (db.objectStoreNames.contains(DB_STORE_NAME)) {
        return;
      }
      const store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id" });
      store.transaction.oncomplete = () => {
        promise.resolve(db);
      };
      store.transaction.onerror = () => {
        console.error(store.transaction.error);
        promise.reject(
          new Error(
            "Failed to create WebSocket client store. There is likely an additional output above."
          )
        );
      };
    };
    request.onerror = () => {
      console.error(request.error);
      promise.reject(
        new Error(
          "Failed to open an IndexedDB database. There is likely an additional output above."
        )
      );
    };
    return promise;
  }
  async getStore() {
    const db = await this.db;
    return db.transaction(DB_STORE_NAME, "readwrite").objectStore(DB_STORE_NAME);
  }
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/ws/WebSocketClientManager.mjs
var WebSocketClientManager = class {
  constructor(channel) {
    __publicField(this, "store");
    __publicField(this, "runtimeClients");
    __publicField(this, "allClients");
    this.channel = channel;
    this.store = typeof indexedDB !== "undefined" ? new WebSocketIndexedDBClientStore() : new WebSocketMemoryClientStore();
    this.runtimeClients = /* @__PURE__ */ new Map();
    this.allClients = /* @__PURE__ */ new Set();
    this.channel.addEventListener("message", (message2) => {
      var _a;
      if (((_a = message2.data) == null ? void 0 : _a.type) === "db:update") {
        this.flushDatabaseToMemory();
      }
    });
    if (typeof window !== "undefined") {
      window.addEventListener("message", async (message2) => {
        var _a;
        if (((_a = message2.data) == null ? void 0 : _a.type) === "msw/worker:stop") {
          await this.removeRuntimeClients();
        }
      });
    }
  }
  async flushDatabaseToMemory() {
    const storedClients = await this.store.getAll();
    this.allClients = new Set(
      storedClients.map((client) => {
        const runtimeClient = this.runtimeClients.get(client.id);
        if (runtimeClient) {
          return runtimeClient;
        }
        return new WebSocketRemoteClientConnection(
          client.id,
          new URL(client.url),
          this.channel
        );
      })
    );
  }
  async removeRuntimeClients() {
    await this.store.deleteMany(Array.from(this.runtimeClients.keys()));
    this.runtimeClients.clear();
    await this.flushDatabaseToMemory();
    this.notifyOthersAboutDatabaseUpdate();
  }
  /**
   * All active WebSocket client connections.
   */
  get clients() {
    return this.allClients;
  }
  /**
   * Notify other runtimes about the database update
   * using the shared `BroadcastChannel` instance.
   */
  notifyOthersAboutDatabaseUpdate() {
    this.channel.postMessage({ type: "db:update" });
  }
  async addClient(client) {
    await this.store.add(client);
    await this.flushDatabaseToMemory();
    this.notifyOthersAboutDatabaseUpdate();
  }
  /**
   * Adds the given `WebSocket` client connection to the set
   * of all connections. The given connection is always the complete
   * connection object because `addConnection()` is called only
   * for the opened connections in the same runtime.
   */
  async addConnection(client) {
    this.runtimeClients.set(client.id, client);
    await this.addClient(client);
    const handleExtraneousMessage = (message2) => {
      const { type, payload } = message2.data;
      if (typeof payload === "object" && "clientId" in payload && payload.clientId !== client.id) {
        return;
      }
      switch (type) {
        case "extraneous:send": {
          client.send(payload.data);
          break;
        }
        case "extraneous:close": {
          client.close(payload.code, payload.reason);
          break;
        }
      }
    };
    const abortController = new AbortController();
    this.channel.addEventListener("message", handleExtraneousMessage, {
      signal: abortController.signal
    });
    client.addEventListener("close", () => abortController.abort(), {
      once: true
    });
  }
};
var WebSocketRemoteClientConnection = class {
  constructor(id, url, channel) {
    this.id = id;
    this.url = url;
    this.channel = channel;
  }
  send(data) {
    this.channel.postMessage({
      type: "extraneous:send",
      payload: {
        clientId: this.id,
        data
      }
    });
  }
  close(code, reason) {
    this.channel.postMessage({
      type: "extraneous:close",
      payload: {
        clientId: this.id,
        code,
        reason
      }
    });
  }
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/ws.mjs
function isBroadcastChannelWithUnref(channel) {
  return typeof Reflect.get(channel, "unref") !== "undefined";
}
var webSocketChannel = new BroadcastChannel("msw:websocket-client-manager");
if (isBroadcastChannelWithUnref(webSocketChannel)) {
  webSocketChannel.unref();
}
function createWebSocketLinkHandler(url) {
  invariant(url, "Expected a WebSocket server URL but got undefined");
  invariant(
    isPath(url),
    "Expected a WebSocket server URL to be a valid path but got %s",
    typeof url
  );
  const clientManager = new WebSocketClientManager(webSocketChannel);
  return {
    get clients() {
      return clientManager.clients;
    },
    addEventListener(event, listener) {
      const handler = new WebSocketHandler(url);
      handler[kEmitter].on("connection", async ({ client }) => {
        await clientManager.addConnection(client);
      });
      handler[kEmitter].on(event, listener);
      return handler;
    },
    broadcast(data) {
      this.broadcastExcept([], data);
    },
    broadcastExcept(clients, data) {
      const ignoreClients = Array.prototype.concat(clients).map((client) => client.id);
      clientManager.clients.forEach((otherClient) => {
        if (!ignoreClients.includes(otherClient.id)) {
          otherClient.send(data);
        }
      });
    }
  };
}
var ws = {
  link: createWebSocketLinkHandler
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/getResponse.mjs
var getResponse = async (handlers, request) => {
  const result = await executeHandlers({
    request,
    requestId: createRequestId(),
    handlers
  });
  return result == null ? void 0 : result.response;
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/HttpResponse.mjs
var HttpResponse = class _HttpResponse extends Response {
  constructor(body, init) {
    const responseInit = normalizeResponseInit(init);
    super(body, responseInit);
    decorateResponse(this, responseInit);
  }
  /**
   * Create a `Response` with a `Content-Type: "text/plain"` body.
   * @example
   * HttpResponse.text('hello world')
   * HttpResponse.text('Error', { status: 500 })
   */
  static text(body, init) {
    const responseInit = normalizeResponseInit(init);
    if (!responseInit.headers.has("Content-Type")) {
      responseInit.headers.set("Content-Type", "text/plain");
    }
    if (!responseInit.headers.has("Content-Length")) {
      responseInit.headers.set(
        "Content-Length",
        body ? new Blob([body]).size.toString() : "0"
      );
    }
    return new _HttpResponse(body, responseInit);
  }
  /**
   * Create a `Response` with a `Content-Type: "application/json"` body.
   * @example
   * HttpResponse.json({ firstName: 'John' })
   * HttpResponse.json({ error: 'Not Authorized' }, { status: 401 })
   */
  static json(body, init) {
    const responseInit = normalizeResponseInit(init);
    if (!responseInit.headers.has("Content-Type")) {
      responseInit.headers.set("Content-Type", "application/json");
    }
    const responseText = JSON.stringify(body);
    if (!responseInit.headers.has("Content-Length")) {
      responseInit.headers.set(
        "Content-Length",
        responseText ? new Blob([responseText]).size.toString() : "0"
      );
    }
    return new _HttpResponse(
      responseText,
      responseInit
    );
  }
  /**
   * Create a `Response` with a `Content-Type: "application/xml"` body.
   * @example
   * HttpResponse.xml(`<user name="John" />`)
   * HttpResponse.xml(`<article id="abc-123" />`, { status: 201 })
   */
  static xml(body, init) {
    const responseInit = normalizeResponseInit(init);
    if (!responseInit.headers.has("Content-Type")) {
      responseInit.headers.set("Content-Type", "text/xml");
    }
    return new _HttpResponse(body, responseInit);
  }
  /**
   * Create a `Response` with a `Content-Type: "text/html"` body.
   * @example
   * HttpResponse.html(`<p class="author">Jane Doe</p>`)
   * HttpResponse.html(`<main id="abc-123">Main text</main>`, { status: 201 })
   */
  static html(body, init) {
    const responseInit = normalizeResponseInit(init);
    if (!responseInit.headers.has("Content-Type")) {
      responseInit.headers.set("Content-Type", "text/html");
    }
    return new _HttpResponse(body, responseInit);
  }
  /**
   * Create a `Response` with an `ArrayBuffer` body.
   * @example
   * const buffer = new ArrayBuffer(3)
   * const view = new Uint8Array(buffer)
   * view.set([1, 2, 3])
   *
   * HttpResponse.arrayBuffer(buffer)
   */
  static arrayBuffer(body, init) {
    const responseInit = normalizeResponseInit(init);
    if (body && !responseInit.headers.has("Content-Length")) {
      responseInit.headers.set("Content-Length", body.byteLength.toString());
    }
    return new _HttpResponse(body, responseInit);
  }
  /**
   * Create a `Response` with a `FormData` body.
   * @example
   * const data = new FormData()
   * data.set('name', 'Alice')
   *
   * HttpResponse.formData(data)
   */
  static formData(body, init) {
    return new _HttpResponse(body, normalizeResponseInit(init));
  }
};

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/delay.mjs
var SET_TIMEOUT_MAX_ALLOWED_INT = 2147483647;
var MIN_SERVER_RESPONSE_TIME = 100;
var MAX_SERVER_RESPONSE_TIME = 400;
var NODE_SERVER_RESPONSE_TIME = 5;
function getRealisticResponseTime() {
  if (isNodeProcess()) {
    return NODE_SERVER_RESPONSE_TIME;
  }
  return Math.floor(
    Math.random() * (MAX_SERVER_RESPONSE_TIME - MIN_SERVER_RESPONSE_TIME) + MIN_SERVER_RESPONSE_TIME
  );
}
async function delay(durationOrMode) {
  let delayTime;
  if (typeof durationOrMode === "string") {
    switch (durationOrMode) {
      case "infinite": {
        delayTime = SET_TIMEOUT_MAX_ALLOWED_INT;
        break;
      }
      case "real": {
        delayTime = getRealisticResponseTime();
        break;
      }
      default: {
        throw new Error(
          `Failed to delay a response: unknown delay mode "${durationOrMode}". Please make sure you provide one of the supported modes ("real", "infinite") or a number.`
        );
      }
    }
  } else if (typeof durationOrMode === "undefined") {
    delayTime = getRealisticResponseTime();
  } else {
    if (durationOrMode > SET_TIMEOUT_MAX_ALLOWED_INT) {
      throw new Error(
        `Failed to delay a response: provided delay duration (${durationOrMode}) exceeds the maximum allowed duration for "setTimeout" (${SET_TIMEOUT_MAX_ALLOWED_INT}). This will cause the response to be returned immediately. Please use a number within the allowed range to delay the response by exact duration, or consider the "infinite" delay mode to delay the response indefinitely.`
      );
    }
    delayTime = durationOrMode;
  }
  return new Promise((resolve) => setTimeout(resolve, delayTime));
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/bypass.mjs
function bypass(input, init) {
  const request = new Request(
    // If given a Request instance, clone it not to exhaust
    // the original request's body.
    input instanceof Request ? input.clone() : input,
    init
  );
  invariant(
    !request.bodyUsed,
    'Failed to create a bypassed request to "%s %s": given request instance already has its body read. Make sure to clone the intercepted request if you wish to read its body before bypassing it.',
    request.method,
    request.url
  );
  const requestClone = request.clone();
  requestClone.headers.append("accept", "msw/passthrough");
  return requestClone;
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/passthrough.mjs
function passthrough() {
  return new Response(null, {
    status: 302,
    statusText: "Passthrough",
    headers: {
      "x-msw-intention": "passthrough"
    }
  });
}

// .yarn/unplugged/msw-virtual-8ba32419ef/node_modules/msw/lib/core/index.mjs
checkGlobals();
export {
  GraphQLHandler,
  HttpHandler,
  HttpMethods,
  HttpResponse,
  MAX_SERVER_RESPONSE_TIME,
  MIN_SERVER_RESPONSE_TIME,
  NODE_SERVER_RESPONSE_TIME,
  RequestHandler,
  SET_TIMEOUT_MAX_ALLOWED_INT,
  SetupApi,
  WebSocketHandler,
  bypass,
  cleanUrl,
  delay,
  getResponse,
  graphql,
  handleRequest,
  http,
  matchRequestUrl,
  passthrough,
  ws
};
/*! Bundled license information:

@bundled-es-modules/cookie/index-esm.js:
  (*! Bundled license information:
  
  cookie/index.js:
    (*!
     * cookie
     * Copyright(c) 2012-2014 Roman Shtylman
     * Copyright(c) 2015 Douglas Christopher Wilson
     * MIT Licensed
     *)
  *)
*/
//# sourceMappingURL=msw.js.map
