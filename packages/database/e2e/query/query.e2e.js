/*
 *  Copyright (c) 2016-present Invertase Limited & Contributors
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this library except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

describe('DatabaseQuery/DatabaseQueryModifiers', function() {
  it('should not mutate previous queries (#2691)', async function() {
    const queryBefore = firebase.database().ref();
    queryBefore._modifiers._modifiers.length.should.equal(0);

    const queryAfter = queryBefore.orderByChild('age');
    queryBefore._modifiers._modifiers.length.should.equal(0);
    queryAfter._modifiers._modifiers.length.should.equal(1);

    const queryAfterAfter = queryAfter.equalTo(30);
    queryAfter._modifiers._modifiers.length.should.equal(1);
    queryAfterAfter._modifiers._modifiers.length.should.equal(3); // adds startAt endAt internally
  });
});
