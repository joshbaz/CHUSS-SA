import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Input, Select } from '@chakra-ui/react'
//import { BsInfoCircleFill } from 'react-icons/bs'

const countryList = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas (the)',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia (Plurinational State of)',
    'Bonaire, Sint Eustatius and Saba',
    'Bosnia and Herzegovina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory (the)',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cayman Islands (the)',
    'Central African Republic (the)',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands (the)',
    'Colombia',
    'Comoros (the)',
    'Congo (the Democratic Republic of the)',
    'Congo (the)',
    'Cook Islands (the)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Curaçao',
    'Cyprus',
    'Czechia',
    "Côte d'Ivoire",
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic (the)',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Falkland Islands (the) [Malvinas]',
    'Faroe Islands (the)',
    'Fiji',
    'Finland',
    'France',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories (the)',
    'Gabon',
    'Gambia (the)',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard Island and McDonald Islands',
    'Holy See (the)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    "Korea (the Democratic People's Republic of)",
    'Korea (the Republic of)',
    'Kuwait',
    'Kyrgyzstan',
    "Lao People's Democratic Republic (the)",
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macao',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands (the)',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia (Federated States of)',
    'Moldova (the Republic of)',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands (the)',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger (the)',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands (the)',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine, State of',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines (the)',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Republic of North Macedonia',
    'Romania',
    'Russian Federation (the)',
    'Rwanda',
    'Réunion',
    'Saint Barthélemy',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Martin (French part)',
    'Saint Pierre and Miquelon',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Sint Maarten (Dutch part)',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan (the)',
    'Suriname',
    'Svalbard and Jan Mayen',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan',
    'Tajikistan',
    'Tanzania, United Republic of',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands (the)',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates (the)',
    'United Kingdom of Great Britain and Northern Ireland (the)',
    'United States Minor Outlying Islands (the)',
    'United States of America (the)',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela (Bolivarian Republic of)',
    'Viet Nam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna',
    'Western Sahara',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'Åland Islands',
]
const EditOpponentDetailForm = ({ values, handleChange, errors }) => {
    return (
        <Container>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Details of Opponent</h1>
                    </Box>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Current Job Title</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Select
                                className={
                                    errors && errors.jobtitle
                                        ? 'input_error'
                                        : ''
                                }
                                name='jobtitle'
                                value={
                                    values !== null && values.jobtitle
                                        ? values.jobtitle
                                        : ''
                                }
                                onChange={handleChange}>
                                <option value=''>select option</option>
                                <option value='Dr.'>Dr.</option>
                                <option value='Prof.'>Prof.</option>
                                <option value='Assoc.Prof.'>Assoc.Prof.</option>
                            </Select>
                            {errors && errors.jobtitle ? (
                                <ErrorMsg className='filesError'>
                                    {errors.jobtitle}
                                </ErrorMsg>
                            ) : null}
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Name</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                type='text'
                                value={
                                    values !== null && values.name
                                        ? values.name
                                        : ''
                                }
                                name='name'
                                onChange={handleChange}
                                placeholder={'i.e Apollo Kimani'}
                            />
                            {errors && errors.name ? (
                                <ErrorMsg className='filesError'>
                                    {errors.name}
                                </ErrorMsg>
                            ) : null}
                        </Box>
                    </Stack>

                    <Stack direction='row' w='100%' spacing='30px'>
                        <Stack direction='column' w='50%'>
                            <Stack spacing={'8px'}>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>Email</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            type='text'
                                            value={
                                                values !== null && values.email
                                                    ? values.email
                                                    : null
                                            }
                                            name='email'
                                            onChange={handleChange}
                                            placeholder={
                                                'email i.e apollo@yahoo.com'
                                            }
                                        />

                                        {errors && errors.email ? (
                                            <ErrorMsg className='filesError'>
                                                {errors.email}
                                            </ErrorMsg>
                                        ) : null}
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/** phone number */}
                        <Stack direction='column' w='50%'>
                            <Stack spacing={'8px'}>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='email'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>Phone Number</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            type='text'
                                            value={
                                                values !== null &&
                                                values.phoneNumber
                                                    ? values.phoneNumber
                                                    : ''
                                            }
                                            name='phoneNumber'
                                            onChange={handleChange}
                                            placeholder={'e.g 256787785114'}
                                        />

                                        {errors && errors.phoneNumber ? (
                                            <ErrorMsg className='filesError'>
                                                {errors.phoneNumber}
                                            </ErrorMsg>
                                        ) : null}
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Postal address</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                type='text'
                                value={
                                    values !== null && values.postalAddress
                                        ? values.postalAddress
                                        : ''
                                }
                                name='postalAddress'
                                onChange={handleChange}
                                placeholder={'postalAddress'}
                            />
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Counry of Residence</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Select
                                className={
                                    errors && errors.countryOfResidence
                                        ? 'input_error'
                                        : ''
                                }
                                placeholder='select option i.e Uganda'
                                name='countryOfResidence'
                                onChange={handleChange}
                                value={
                                    values !== null && values.countryOfResidence
                                        ? values.countryOfResidence
                                        : ''
                                }>
                                {countryList.map((data, index) => {
                                    return (
                                        <option key={index} value={data}>
                                            {data}
                                        </option>
                                    )
                                })}
                            </Select>
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone' className='label2'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Higer Education Institution</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                type='text'
                                value={
                                    values !== null && values.placeOfWork
                                        ? values.placeOfWork
                                        : ''
                                }
                                name='placeOfWork'
                                onChange={handleChange}
                                placeholder={'i.e Makerere University'}
                            />

                            {errors && errors.placeOfWork ? (
                                <ErrorMsg className='filesError'>
                                    {errors.placeOfWork}
                                </ErrorMsg>
                            ) : null}
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone' className='label2'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>
                                    Other Academic or Professional Titles
                                </Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                type='text'
                                value={
                                    values !== null && values.otherTitles
                                        ? values.otherTitles
                                        : ''
                                }
                                name='otherTitles'
                                onChange={handleChange}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default EditOpponentDetailForm

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;

    .form_container {
        width: 100%;
        min-height: 288px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }

    .formtitle {
        height: 54px;
        width: 100%;

        border-bottom: 1px solid #ebeefa;
        padding: 0 30px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    .s_name {
        color: #20202a;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 20px;
    }

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    .label2 {
        width: 90px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    textarea {
        background: #fefaf2;
        border-radius: 6px;
        width: 100%;
        height: 79px;
        padding: 7px 15px;

        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #171c26;
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    #SRN {
        height: 40px;
    }

    .form_subtitle {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
        letter-spacing: 0.02em;
    }

    input {
        background: #fefaf2;
        border-radius: 6px;

        height: 32px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
    select {
        background: #fef9ef;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;

        padding: 0 10px;
    }
`

const ErrorMsg = styled(Box)`
    font-size: 13px;
    line-height: 20px;
    padding: 5px 10px;
    color: #f14c54;
    font-family: 'Inter', sans-serif;

    .filesError {
        padding: 0;
    }
`
