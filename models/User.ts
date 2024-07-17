import { Model, Sequelize, DataTypes } from "sequelize";

export default class User extends Model {
    public id?: number;
    public firstname!: string;
    public lastname!: string;
    public dob!: string;
    public languages!: string[];
    public funding!: string;
}

// languages[0] depicts primary

export const UserMap = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstname: {
                type: DataTypes.STRING,
            },
            lastname: {
                type: DataTypes.STRING,
            },
            dob: {
                type: DataTypes.STRING,
            },
            languages: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            funding: {
                type: DataTypes.STRING(6),
            },
        },
        {
            sequelize,
            tableName: "users",
            timestamps: false,
        }
    );
    User.sync();
};
