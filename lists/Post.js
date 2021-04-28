const { Text, Select, Relationship } = require("@keystonejs/fields")

const postFields = {
    fields: {
        title: {
            type: Text,
            isRequired : true
        },
        body: {
            type: Text,
            isMultiline: true
        },
        status: {
            type: Select,
            options: [
                {value: "PUBLISHED", label: "Published"},
                {value: "UNPUBLISHED", label: "Unpublished"},
            ],
            defalutValue: "PUBLISHED"
        },
        author: {
            type: Text,
            isRequired: true
        }
    }
}

module.exports = postFields;