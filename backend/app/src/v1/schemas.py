# -*- coding: utf-8 -*-

import six
from jsonschema import RefResolver
# TODO: datetime support

class RefNode(object):

    def __init__(self, data, ref):
        self.ref = ref
        self._data = data

    def __getitem__(self, key):
        return self._data.__getitem__(key)

    def __setitem__(self, key, value):
        return self._data.__setitem__(key, value)

    def __getattr__(self, key):
        return self._data.__getattribute__(key)

    def __iter__(self):
        return self._data.__iter__()

    def __repr__(self):
        return repr({'$ref': self.ref})

    def __eq__(self, other):
        if isinstance(other, RefNode):
            return self._data == other._data and self.ref == other.ref
        elif six.PY2:
            return object.__eq__(other)
        elif six.PY3:
            return object.__eq__(self, other)
        else:
            return False

    def __deepcopy__(self, memo):
        return RefNode(copy.deepcopy(self._data), self.ref)

    def copy(self):
        return RefNode(self._data, self.ref)

###
### DO NOT CHANGE THIS FILE
### 
### The code is auto generated, your change will be overwritten by 
### code generating.
###

base_path = '/v1'

definitions = {'definitions': {'error': {'type': 'object', 'properties': {'errorMessage': {'type': 'string', 'example': 'error message'}}}, 'note': {'type': 'object', 'properties': {'note_id': {'type': 'integer', 'example': 1}, 'note': {'type': 'string', 'example': 'this is my note'}, 'user_id': {'type': 'integer', 'example': 1}, 'video_id': {'type': 'string', 'example': 'https://www.youtube.com/watch?v=gSdG3FsMBq4'}, 'timestamp': {'type': 'number', 'example': 2.5}}}, 'video': {'type': 'object', 'properties': {'video_id': {'type': 'string', 'example': 'https://www.youtube.com/watch?v=gSdG3FsMBq4'}, 'user_id': {'type': 'integer', 'example': 1}, 'video_title': {'type': 'string', 'example': 'physics 101'}, 'categories': {'type': 'array', 'items': {'type': 'string'}, 'example': ['education', 'comedy']}, 'notes_ids': {'type': 'array', 'items': {'type': 'integer'}, 'example': [1, 4, 17]}, 'notes_count': {'type': 'integer', 'example': 3}}}}, 'parameters': {}}

validators = {
    ('auth_google_logout', 'DELETE'): {'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}},
    ('auth_google_login', 'POST'): {'json': {'type': 'object', 'properties': {'googleAccessToken': {'type': 'string', 'example': 'hfwfhw0fhw0f'}, 'email': {'type': 'string', 'example': 'mitchell_shelton@y7mail.com'}}}},
    ('notes', 'GET'): {'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}, 'args': {'required': [], 'properties': {'sort': {'type': 'string', 'enum': ['+note_id', '+note', '+user_id', '+video_id', '+timestamp', '-note_id', '-note', '-user_id', '-video_id', '-timestamp'], 'default': '+timestamp'}, 'note_id': {'type': 'integer'}, 'video_id': {'type': 'string'}, 'user_id': {'type': 'integer'}, 'timestamp': {'type': 'number'}, 'note': {'type': 'string'}}}},
    ('notes', 'POST'): {'json': {'type': 'object', 'properties': {'note': {'type': 'string', 'example': 'this is my note'}, 'user_id': {'type': 'integer', 'example': 1}, 'video_id': {'type': 'string', 'example': 'https://www.youtube.com/watch?v=gSdG3FsMBq4'}, 'timestamp': {'type': 'number', 'example': 2.5}}}, 'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}},
    ('notes_note_id', 'GET'): {'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}},
    ('notes_note_id', 'PUT'): {'json': {'$ref': '#/definitions/note'}, 'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}},
    ('notes_note_id', 'DELETE'): {'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}},
    ('videos', 'GET'): {'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}, 'args': {'required': [], 'properties': {'sort': {'type': 'string', 'enum': ['+video_id', '+user_id', '-video_id', '-user_id', '+video_title', '-video_title', '+categories', '-categories', '+notes_count', '-notes_count'], 'default': '+video_id'}, 'video_id': {'type': 'string'}, 'user_id': {'type': 'integer'}, 'video_title': {'type': 'string'}, 'categories': {'type': 'string'}, 'notes_count': {'type': 'integer'}}}},
    ('search', 'GET'): {'headers': {'required': ['Authorization'], 'properties': {'Authorization': {'type': 'string'}}}, 'args': {'required': ['search'], 'properties': {'search': {'type': 'string'}}}},
}

filters = {
    ('auth_google_logout', 'DELETE'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'message': {'type': 'string', 'example': 'successfully logged out'}}}}, 401: {'headers': None, 'schema': None}, 422: {'headers': None, 'schema': None}},
    ('auth_google_login', 'POST'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'accessToken': {'type': 'string', 'example': 'fuehfoeifjw'}, 'user_id': {'type': 'integer', 'example': 1}}}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}},
    ('notes', 'GET'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'notes': {'type': 'array', 'items': {'$ref': '#/definitions/note'}}, 'num_notes': {'type': 'integer', 'example': 1}}}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 401: {'headers': None, 'schema': None}, 422: {'headers': None, 'schema': None}},
    ('notes', 'POST'): {201: {'headers': None, 'schema': {'$ref': '#/definitions/note'}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 401: {'headers': None, 'schema': None}, 409: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 422: {'headers': None, 'schema': None}},
    ('notes_note_id', 'GET'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/note'}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 401: {'headers': None, 'schema': None}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 422: {'headers': None, 'schema': None}},
    ('notes_note_id', 'PUT'): {200: {'headers': None, 'schema': {'$ref': '#/definitions/note'}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 401: {'headers': None, 'schema': None}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 409: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 422: {'headers': None, 'schema': None}},
    ('notes_note_id', 'DELETE'): {200: {'headers': None, 'schema': None}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 401: {'headers': None, 'schema': None}, 404: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 422: {'headers': None, 'schema': None}},
    ('videos', 'GET'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'videos': {'type': 'array', 'items': {'$ref': '#/definitions/video'}}, 'num_videos': {'type': 'integer', 'example': 1}}}}, 400: {'headers': None, 'schema': {'$ref': '#/definitions/error'}}, 401: {'headers': None, 'schema': None}, 422: {'headers': None, 'schema': None}},
    ('search', 'GET'): {200: {'headers': None, 'schema': {'type': 'object', 'properties': {'notes': {'type': 'array', 'items': {'$ref': '#/definitions/note'}}, 'num_notes': {'type': 'integer', 'example': 1}}}}},
}

scopes = {
}

resolver = RefResolver.from_schema(definitions)

class Security(object):

    def __init__(self):
        super(Security, self).__init__()
        self._loader = lambda: []

    @property
    def scopes(self):
        return self._loader()

    def scopes_loader(self, func):
        self._loader = func
        return func

security = Security()


def merge_default(schema, value, get_first=True, resolver=None):
    # TODO: more types support
    type_defaults = {
        'integer': 9573,
        'string': 'something',
        'object': {},
        'array': [],
        'boolean': False
    }

    results = normalize(schema, value, type_defaults, resolver=resolver)
    if get_first:
        return results[0]
    return results


def normalize(schema, data, required_defaults=None, resolver=None):
    if required_defaults is None:
        required_defaults = {}
    errors = []

    class DataWrapper(object):

        def __init__(self, data):
            super(DataWrapper, self).__init__()
            self.data = data

        def get(self, key, default=None):
            if isinstance(self.data, dict):
                return self.data.get(key, default)
            return getattr(self.data, key, default)

        def has(self, key):
            if isinstance(self.data, dict):
                return key in self.data
            return hasattr(self.data, key)

        def keys(self):
            if isinstance(self.data, dict):
                return list(self.data.keys())
            return list(getattr(self.data, '__dict__', {}).keys())

        def get_check(self, key, default=None):
            if isinstance(self.data, dict):
                value = self.data.get(key, default)
                has_key = key in self.data
            else:
                try:
                    value = getattr(self.data, key)
                except AttributeError:
                    value = default
                    has_key = False
                else:
                    has_key = True
            return value, has_key

    def _merge_dict(src, dst):
        for k, v in six.iteritems(dst):
            if isinstance(src, dict):
                if isinstance(v, dict):
                    r = _merge_dict(src.get(k, {}), v)
                    src[k] = r
                else:
                    src[k] = v
            else:
                src = {k: v}
        return src

    def _normalize_dict(schema, data):
        result = {}
        if not isinstance(data, DataWrapper):
            data = DataWrapper(data)

        for _schema in schema.get('allOf', []):
            rs_component = _normalize(_schema, data)
            _merge_dict(result, rs_component)

        for key, _schema in six.iteritems(schema.get('properties', {})):
            # set default
            type_ = _schema.get('type', 'object')

            # get value
            value, has_key = data.get_check(key)
            if has_key or '$ref' in _schema:
                result[key] = _normalize(_schema, value)
            elif 'default' in _schema:
                result[key] = _schema['default']
            elif key in schema.get('required', []):
                if type_ in required_defaults:
                    result[key] = required_defaults[type_]
                else:
                    errors.append(dict(name='property_missing',
                                       message='`%s` is required' % key))

        additional_properties_schema = schema.get('additionalProperties', False)
        if additional_properties_schema is not False:
            aproperties_set = set(data.keys()) - set(result.keys())
            for pro in aproperties_set:
                result[pro] = _normalize(additional_properties_schema, data.get(pro))

        return result

    def _normalize_list(schema, data):
        result = []
        if hasattr(data, '__iter__') and not isinstance(data, (dict, RefNode)):
            for item in data:
                result.append(_normalize(schema.get('items'), item))
        elif 'default' in schema:
            result = schema['default']
        return result

    def _normalize_default(schema, data):
        if data is None:
            return schema.get('default')
        else:
            return data

    def _normalize_ref(schema, data):
        if resolver == None:
            raise TypeError("resolver must be provided")
        ref = schema.get(u"$ref")
        scope, resolved = resolver.resolve(ref)
        if resolved.get('nullable', False) and not data:
            return {}
        return _normalize(resolved, data)

    def _normalize(schema, data):
        if schema is True or schema == {}:
            return data
        if not schema:
            return None
        funcs = {
            'object': _normalize_dict,
            'array': _normalize_list,
            'default': _normalize_default,
            'ref': _normalize_ref
        }
        type_ = schema.get('type', 'object')
        if type_ not in funcs:
            type_ = 'default'
        if schema.get(u'$ref', None):
            type_ = 'ref'

        return funcs[type_](schema, data)

    return _normalize(schema, data), errors
