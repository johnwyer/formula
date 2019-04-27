const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = mongoose.Schema({
    race: {
        type: Schema.Types.ObjectId,
        ref: 'Race',
        required: true
    },
    position_1: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_2: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_3: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_4: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_5: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_6: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_7: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_8: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_9: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_10: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_11: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_12: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_13: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_14: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_15: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_16: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_17: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_18: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_19: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    },
    position_20: {
        position: {
            required: true,
            type: Number
        },
        driver: {
            type: Schema.Types.ObjectId,
            ref: 'Driver',
            required: true
        },
        result: {
            required: true,
            type: String
        }
    }
},
{
timestamps: true
});

resultSchema.set("toJSON", { virtuals: true });
const Result = mongoose.model("Result", resultSchema);

module.exports = { Result };