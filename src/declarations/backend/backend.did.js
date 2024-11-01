export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'list' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    'store' : IDL.Func([IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
